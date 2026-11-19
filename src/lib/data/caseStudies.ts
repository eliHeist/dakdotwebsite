/**
 * Full case-study content, from a local module (`src/lib/data/projects/<slug>.ts`)
 * or from the remote projects API (see docs/projects-api.md, "Case-study content").
 *
 * Local modules are trusted and may contain HTML in paragraphs and list items.
 * Remote text is always rendered as plain text, never as HTML.
 */
import { LINE_IDS, type LineId, type StationMedia } from './network';

export type CaseImage = { src: string; alt: string };
export type CaseSection =
	| { type: 'images'; title?: string; cols: 1 | 2 | 3; narrow: boolean; images: CaseImage[] }
	| { type: 'paragraph'; title?: string; html?: string; text?: string[] }
	| { type: 'list'; title?: string; html?: string[]; text?: string[] };

export type CaseStudy = {
	slug: string;
	title: string;
	client?: string;
	industry?: string;
	year?: number;
	tags: string[];
	lines: LineId[];
	overviewHtml?: string;
	overviewText?: string[];
	goals: string[];
	link?: { label: string; url: string };
	splash?: StationMedia;
	sections: CaseSection[];
	source: 'local' | 'remote';
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

const paras = (s: string) =>
	s
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter(Boolean);

/* ---------- local ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export function fromLocalModule(mod: Any): CaseStudy {
	const media = (name: string) =>
		/^(https?:)?\//.test(name) ? name : `${mod.mediaPath ?? ''}${name}`;
	const tags: string[] = (mod.tags ?? []).map((t: Any) => t.name);
	const lines: LineId[] = mod.lines?.length
		? mod.lines
		: ([...new Set(tags.map((t) => TAG_LINE[t]).filter(Boolean))] as LineId[]);

	const sections: CaseSection[] = [];
	for (const s of mod.sections ?? []) {
		const title = typeof s.title === 'string' ? s.title : undefined;
		if (s.type === 'images' || s.type === 'images-sm') {
			sections.push({
				type: 'images',
				title,
				cols: s.cols === 3 ? 3 : s.cols === 2 ? 2 : 1,
				narrow: s.type === 'images-sm',
				images: (s.images ?? []).map((img: Any) =>
					typeof img === 'string'
						? { src: media(img), alt: `${mod.title}: project image` }
						: { src: media(img.src), alt: img.alt ?? `${mod.title}: project image` }
				)
			});
		} else if (s.type === 'paragraph') {
			sections.push({ type: 'paragraph', title, html: s.body });
		} else if (s.type === 'list') {
			sections.push({ type: 'list', title, html: s.list_items ?? [] });
		}
	}

	return {
		slug: mod.slug,
		title: mod.title,
		client: mod.client,
		industry: mod.industry?.name,
		year: mod.year,
		tags,
		lines: lines.length ? lines : ['brand'],
		overviewHtml: mod.overview,
		goals: mod.goals ?? [],
		link: mod.link?.url
			? {
					label: mod.link.label ?? mod.link.url,
					url: /^https?:\/\//.test(mod.link.url) ? mod.link.url : `https://${mod.link.url}`
				}
			: undefined,
		splash: mod.splash?.src
			? { type: mod.splash.type ?? 'image', src: mod.splash.src, alt: mod.title }
			: undefined,
		sections,
		source: 'local'
	};
}

const localModules = import.meta.glob<{ default: Any }>('$lib/data/projects/*.ts', { eager: true });

export function loadLocalCaseStudy(slug: string): CaseStudy | null {
	for (const m of Object.values(localModules)) {
		if (m.default?.slug === slug) return fromLocalModule(m.default);
	}
	return null;
}

/* ---------- remote ---------- */

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);
const isHttp = (v: unknown): v is string => typeof v === 'string' && /^(https:\/\/|\/)/.test(v);

/** Validates a remote record carrying case-study content. Unknown or unsafe values are dropped. */
export function fromRemoteRecord(p: Any): CaseStudy | null {
	if (!p || typeof p !== 'object' || typeof p.slug !== 'string' || !/^[a-z0-9-]+$/.test(p.slug))
		return null;
	const title = str(p.title);
	if (!title || p.published === false) return null;
	const lines = Array.isArray(p.lines)
		? ([...new Set(p.lines.filter((l: unknown) => LINE_IDS.includes(l as LineId)))] as LineId[])
		: [];

	const sections: CaseSection[] = [];
	for (const s of Array.isArray(p.sections) ? p.sections : []) {
		const t = str(s?.title);
		if (s?.type === 'images' && Array.isArray(s.images)) {
			const images = s.images
				.filter((i: Any) => isHttp(i?.src))
				.map((i: Any) => ({ src: i.src, alt: str(i.alt) ?? `${title}: project image` }));
			if (images.length)
				sections.push({
					type: 'images',
					title: t,
					cols: s.cols === 3 ? 3 : s.cols === 2 ? 2 : 1,
					narrow: s.narrow === true,
					images
				});
		} else if (s?.type === 'paragraph' && str(s.text)) {
			sections.push({ type: 'paragraph', title: t, text: paras(s.text) });
		} else if (s?.type === 'list' && Array.isArray(s.items)) {
			const items = s.items.map(str).filter(Boolean) as string[];
			if (items.length) sections.push({ type: 'list', title: t, text: items });
		}
	}

	const splash =
		p.splash && isHttp(p.splash.src) && (p.splash.type === 'image' || p.splash.type === 'video')
			? {
					type: p.splash.type,
					src: p.splash.src,
					alt: str(p.splash.alt) ?? title,
					poster: p.splash.poster
				}
			: p.thumb && isHttp(p.thumb.src)
				? { type: p.thumb.type === 'video' ? 'video' : 'image', src: p.thumb.src, alt: title }
				: undefined;

	const linkUrl = str(p.link?.url);
	return {
		slug: p.slug,
		title,
		client: str(p.client),
		industry: str(p.industry),
		year: typeof p.year === 'number' ? p.year : undefined,
		tags: Array.isArray(p.tags) ? p.tags.map(str).filter(Boolean) : [],
		lines: lines.length ? lines : ['brand'],
		overviewText: str(p.overview) ? paras(p.overview) : undefined,
		goals: Array.isArray(p.goals) ? (p.goals.map(str).filter(Boolean) as string[]) : [],
		link:
			linkUrl && /^https:\/\//.test(linkUrl)
				? { label: str(p.link.label) ?? linkUrl.replace(/^https:\/\//, ''), url: linkUrl }
				: undefined,
		splash: splash as StationMedia | undefined,
		sections,
		source: 'remote'
	};
}

export async function loadRemoteCaseStudy(
	fetchFn: typeof fetch,
	url: string | undefined,
	token: string | undefined,
	slug: string
): Promise<CaseStudy | null> {
	if (!url) return null;
	try {
		const res = await fetchFn(url, {
			headers: {
				accept: 'application/json',
				...(token ? { authorization: `Bearer ${token}` } : {})
			},
			signal: AbortSignal.timeout(5000)
		});
		if (!res.ok) return null;
		const body = await res.json();
		const rec = Array.isArray(body?.projects)
			? body.projects.find((p: Any) => p?.slug === slug)
			: null;
		return rec ? fromRemoteRecord(rec) : null;
	} catch {
		return null;
	}
}
