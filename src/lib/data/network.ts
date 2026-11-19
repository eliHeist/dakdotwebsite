/**
 * The Dakdot network: service lines and the project "stations" that ride them.
 *
 * Stations come from two sources, merged by slug (remote wins):
 *  1. Local case-study modules in `src/lib/data/projects/*.ts`
 *  2. An optional remote projects API (see `docs/projects-api.md`), enabled by
 *     setting `PROJECTS_API_URL` (and optionally `PROJECTS_API_TOKEN`).
 */

export const LINE_IDS = ['web', 'brand', 'motion'] as const;
export type LineId = (typeof LINE_IDS)[number];

export type ServiceLine = {
	id: LineId;
	name: string;
	/** Short phrase shown in the legend. */
	summary: string;
	/** Service page this line terminates at. */
	href: string;
	/** CSS custom property holding the line colour. */
	colorVar: string;
	/** Capabilities shown when the line has no stations yet. */
	capabilities: string[];
};

export const LINES: Record<LineId, ServiceLine> = {
	web: {
		id: 'web',
		name: 'Web Development',
		summary: 'Web apps, platforms and sites',
		href: '/services/web-development',
		colorVar: '--color-line-web',
		capabilities: ['Web applications', 'Business systems', 'Booking platforms', 'Websites']
	},
	brand: {
		id: 'brand',
		name: 'Brand Design',
		summary: 'Identities built as systems',
		href: '/services/brand-design',
		colorVar: '--color-line-brand',
		capabilities: ['Identity systems', 'Logos & emblems', 'Packaging', 'Guidelines']
	},
	motion: {
		id: 'motion',
		name: 'Motion',
		summary: 'Animation and 3D',
		href: '/services/motion',
		colorVar: '--color-line-motion',
		capabilities: ['3D animation', 'Product visualisation', 'Explainers', 'Video']
	}
};

export type StationMedia = {
	type: 'image' | 'video';
	/** Absolute URL, or a site-relative path for local media. */
	src: string;
	alt?: string;
	/** Optional poster frame for video. */
	poster?: string;
};

export type Station = {
	slug: string;
	title: string;
	client?: string;
	/** One sentence, shown in the hover preview. */
	summary?: string;
	/** Service lines this project rides. 2+ lines makes it an interchange. */
	lines: LineId[];
	industry?: string;
	year?: number;
	/** Deliverable labels, e.g. "Logo", "Web Application". */
	tags: string[];
	featured: boolean;
	/** Lower sorts first. */
	order: number;
	kind: 'case-study' | 'product';
	thumb: StationMedia;
	/** Where the station links: an internal case study or an external product. */
	href: string;
	external: boolean;
	source: 'local' | 'remote';
};

/** Shape the remote API must return. Mirrors docs/projects-api.schema.json. */
export type RemoteProject = {
	slug: string;
	title: string;
	client?: string;
	summary?: string;
	lines: LineId[];
	industry?: string;
	year?: number;
	tags?: string[];
	featured?: boolean;
	order?: number;
	kind?: 'case-study' | 'product';
	thumb: StationMedia;
	/** Case-study page on this site (`/case-studies/<slug>`) or an external URL. */
	url?: string;
	published?: boolean;
};

export type RemoteProjectsResponse = {
	version: 1;
	projects: RemoteProject[];
};

/* ---------- local modules ---------- */

type LocalTag = { name: string };
type LocalModule = {
	title: string;
	slug: string;
	tags?: LocalTag[];
	industry?: { name: string };
	thumb?: { type: 'image' | 'video'; src: string };
	overview?: string;
	/** Optional explicit lines; otherwise inferred from tags. */
	lines?: LineId[];
	featured?: boolean;
	order?: number;
	year?: number;
	client?: string;
	summary?: string;
};

const TAG_LINE: Record<string, LineId> = {
	'Package Design': 'brand',
	Logo: 'brand',
	'Badge & Emblem': 'brand',
	Content: 'brand',
	Website: 'web',
	'Web Application': 'web',
	Animation: 'motion',
	'3D': 'motion',
	Video: 'motion'
};

function firstSentence(text?: string): string | undefined {
	if (!text) return undefined;
	const m = text.match(/^.*?[.!?](\s|$)/);
	return (m ? m[0] : text).trim();
}

function fromLocal(mod: LocalModule, index: number): Station | null {
	if (!mod?.slug || !mod.title || !mod.thumb?.src) return null;
	const tags = (mod.tags ?? []).map((t) => t.name);
	const lines =
		mod.lines && mod.lines.length
			? mod.lines
			: ([...new Set(tags.map((t) => TAG_LINE[t]).filter(Boolean))] as LineId[]);
	return {
		slug: mod.slug,
		title: mod.title,
		client: mod.client,
		summary: mod.summary ?? firstSentence(mod.overview),
		lines: lines.length ? lines : ['brand'],
		industry: mod.industry?.name,
		year: mod.year,
		tags,
		featured: mod.featured ?? true,
		order: mod.order ?? 100 + index,
		kind: 'case-study',
		thumb: { type: mod.thumb.type, src: mod.thumb.src, alt: `${mod.title} project` },
		href: `/case-studies/${mod.slug}`,
		external: false,
		source: 'local'
	};
}

export function loadLocalStations(): Station[] {
	const modules = import.meta.glob<{ default: LocalModule }>('$lib/data/projects/*.ts', {
		eager: true
	});
	return Object.values(modules)
		.map((m, i) => fromLocal(m.default, i))
		.filter((s): s is Station => s !== null);
}

/* ---------- remote API ---------- */

function isLine(v: unknown): v is LineId {
	return typeof v === 'string' && (LINE_IDS as readonly string[]).includes(v);
}

/** Validates one remote record; invalid records are dropped, never trusted. */
export function fromRemote(p: unknown): Station | null {
	if (!p || typeof p !== 'object') return null;
	const r = p as Partial<RemoteProject>;
	if (typeof r.slug !== 'string' || !/^[a-z0-9-]+$/.test(r.slug)) return null;
	if (typeof r.title !== 'string' || !r.title.trim()) return null;
	if (r.published === false) return null;
	const lines = Array.isArray(r.lines) ? [...new Set(r.lines.filter(isLine))] : [];
	if (!lines.length) return null;
	const thumb = r.thumb;
	if (!thumb || typeof thumb.src !== 'string' || !['image', 'video'].includes(thumb.type))
		return null;

	const url = typeof r.url === 'string' && r.url ? r.url : `/case-studies/${r.slug}`;
	const external = /^https?:\/\//.test(url);
	return {
		slug: r.slug,
		title: r.title.trim(),
		client: typeof r.client === 'string' ? r.client : undefined,
		summary: typeof r.summary === 'string' ? r.summary : undefined,
		lines,
		industry: typeof r.industry === 'string' ? r.industry : undefined,
		year: typeof r.year === 'number' ? r.year : undefined,
		tags: Array.isArray(r.tags) ? r.tags.filter((t): t is string => typeof t === 'string') : [],
		featured: r.featured ?? false,
		order: typeof r.order === 'number' ? r.order : 500,
		kind: r.kind === 'product' ? 'product' : 'case-study',
		thumb: {
			type: thumb.type,
			src: thumb.src,
			alt: thumb.alt ?? `${r.title} project`,
			poster: thumb.poster
		},
		href: url,
		external,
		source: 'remote'
	};
}

export async function loadRemoteStations(
	fetchFn: typeof fetch,
	url: string | undefined,
	token?: string
): Promise<Station[]> {
	if (!url) return [];
	try {
		const res = await fetchFn(url, {
			headers: {
				accept: 'application/json',
				...(token ? { authorization: `Bearer ${token}` } : {})
			},
			signal: AbortSignal.timeout(5000)
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const body = (await res.json()) as Partial<RemoteProjectsResponse>;
		if (body.version !== 1 || !Array.isArray(body.projects)) {
			throw new Error('unexpected response shape (expected { version: 1, projects: [] })');
		}
		return body.projects.map(fromRemote).filter((s): s is Station => s !== null);
	} catch (err) {
		// The site must never break because the projects API is down: fall back to local data.
		console.warn(`[network] projects API unavailable, using local data only: ${String(err)}`);
		return [];
	}
}

export function mergeStations(local: Station[], remote: Station[]): Station[] {
	const bySlug = new Map<string, Station>();
	for (const s of local) bySlug.set(s.slug, s);
	for (const s of remote) bySlug.set(s.slug, s);
	return [...bySlug.values()].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/** Count of stations per line, for the legend. */
export function lineCounts(stations: Station[]): Record<LineId, number> {
	const counts = { web: 0, brand: 0, motion: 0 } as Record<LineId, number>;
	for (const s of stations) for (const l of s.lines) counts[l]++;
	return counts;
}
