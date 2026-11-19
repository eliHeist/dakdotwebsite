import { LINE_IDS, LINES, type LineId, type Station } from '$lib/data/network';

export type Pt = [number, number];

/** Map canvas (SVG viewBox units). */
export const MAP_W = 640;
export const MAP_H = 560;
export const HUB: Pt = [320, 280];

/** Schematic routes: horizontals, verticals and 45° runs, all through the hub. */
export const ROUTES: Record<LineId, Pt[]> = {
	web: [
		[20, 130],
		[190, 130],
		[320, 260],
		[320, 300],
		[460, 440],
		[620, 440]
	],
	brand: [
		[80, 520],
		[320, 280],
		[460, 140],
		[620, 140]
	],
	motion: [
		[20, 340],
		[140, 340],
		[200, 280],
		[440, 280],
		[500, 220],
		[620, 220]
	]
};

export function pathD(pts: Pt[]): string {
	return pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
}

function segLengths(pts: Pt[]) {
	const lens: number[] = [];
	for (let i = 1; i < pts.length; i++) {
		lens.push(Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
	}
	return lens;
}

export function routeLength(pts: Pt[]): number {
	return segLengths(pts).reduce((a, b) => a + b, 0);
}

/** Point and unit direction at fraction t (0..1) along a polyline. */
export function pointAt(pts: Pt[], t: number): { p: Pt; dir: Pt } {
	const lens = segLengths(pts);
	let d = Math.max(0, Math.min(1, t)) * lens.reduce((a, b) => a + b, 0);
	for (let i = 0; i < lens.length; i++) {
		if (d <= lens[i] || i === lens.length - 1) {
			const [x0, y0] = pts[i];
			const [x1, y1] = pts[i + 1];
			const f = lens[i] ? d / lens[i] : 0;
			return {
				p: [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f],
				dir: [(x1 - x0) / (lens[i] || 1), (y1 - y0) / (lens[i] || 1)]
			};
		}
		d -= lens[i];
	}
	return { p: pts[pts.length - 1], dir: [1, 0] };
}

/** Fraction along a route closest to the hub. */
function hubFraction(pts: Pt[]): number {
	let best = 0.5,
		bestD = Infinity;
	for (let i = 0; i <= 200; i++) {
		const t = i / 200;
		const { p } = pointAt(pts, t);
		const d = Math.hypot(p[0] - HUB[0], p[1] - HUB[1]);
		if (d < bestD) {
			bestD = d;
			best = t;
		}
	}
	return best;
}

/**
 * Fractions along a line, split between the two arms either side of the hub
 * and spaced evenly within each arm, so labels never bunch up.
 */
function slots(count: number, pts: Pt[]): number[] {
	if (count <= 0) return [];
	const h = hubFraction(pts);
	const gap = 0.12;
	const arms = [
		{ from: 0.04, to: h - gap },
		{ from: h + gap, to: 0.96 }
	].filter((a) => a.to > a.from);
	const total = arms.reduce((s, a) => s + (a.to - a.from), 0);
	// Share stations by arm length; the longer arm takes any remainder.
	const shares = arms.map((a) => Math.round((count * (a.to - a.from)) / total));
	let diff = count - shares.reduce((a, b) => a + b, 0);
	const longest = arms.length > 1 && arms[1].to - arms[1].from > arms[0].to - arms[0].from ? 1 : 0;
	shares[longest] += diff;
	const out: number[] = [];
	arms.forEach((a, i) => {
		const n = Math.max(0, shares[i]);
		for (let k = 0; k < n; k++) out.push(a.from + ((k + 0.5) / n) * (a.to - a.from));
	});
	return out;
}

export type PlacedStation = {
	station: Station;
	line: LineId;
	x: number;
	y: number;
	/** Label side: unit normal pointing away from the route. */
	nx: number;
	ny: number;
	interchange: boolean;
};

export type CapabilityStop = {
	line: LineId;
	label: string;
	x: number;
	y: number;
	nx: number;
	ny: number;
};

/** The perpendicular to dir that points away from the hub, for label placement. */
function normalFor(p: Pt, dir: Pt): Pt {
	let n: Pt = [-dir[1], dir[0]];
	const away = (p[0] - HUB[0]) * n[0] + (p[1] - HUB[1]) * n[1];
	if (away < 0) n = [-n[0], -n[1]];
	return n;
}

/**
 * Each station sits once, on its first line (the line it is filed under);
 * a station riding 2+ lines is drawn as an interchange and lights all its lines.
 */
export function placeStations(
	stations: Station[],
	max = 12
): {
	placed: PlacedStation[];
	capabilities: CapabilityStop[];
} {
	const shown = stations.filter((s) => s.featured).slice(0, max);
	const byLine: Record<LineId, Station[]> = { web: [], brand: [], motion: [] };
	for (const s of shown) byLine[s.lines[0]].push(s);

	const placed: PlacedStation[] = [];
	const capabilities: CapabilityStop[] = [];

	for (const line of LINE_IDS) {
		const route = ROUTES[line];
		const list = byLine[line];
		if (list.length) {
			let straight = 0;
			slots(list.length, route).forEach((t, i) => {
				const { p, dir } = pointAt(route, t);
				let [nx, ny] = normalFor(p, dir);
				// Neighbours on a horizontal or vertical run take alternate sides of the line.
				if (Math.abs(dir[0]) < 0.01 || Math.abs(dir[1]) < 0.01) {
					if (straight++ % 2 === 1) [nx, ny] = [-nx, -ny];
				}
				placed.push({
					station: list[i],
					line,
					x: p[0],
					y: p[1],
					nx,
					ny,
					interchange: list[i].lines.length > 1
				});
			});
		} else {
			// A line with no work yet shows what it carries, as quiet capability stops.
			const caps = LINES[line].capabilities.slice(0, 3);
			slots(caps.length, route).forEach((t, i) => {
				const { p, dir } = pointAt(route, t);
				const [nx, ny] = normalFor(p, dir);
				capabilities.push({ line, label: caps[i], x: p[0], y: p[1], nx, ny });
			});
		}
	}
	return { placed, capabilities };
}
