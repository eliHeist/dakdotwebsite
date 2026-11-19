import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { loadLocalCaseStudy, loadRemoteCaseStudy } from '$lib/data/caseStudies';
import { loadLocalStations, loadRemoteStations, mergeStations } from '$lib/data/network';
import type { EntryGenerator, PageServerLoad } from './$types';

// Local case studies prerender; remote-only ones render on request.
export const prerender = 'auto';

export const entries: EntryGenerator = () => loadLocalStations().map((s) => ({ slug: s.slug }));

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { slug } = params;
	const [remoteStudy, remoteStations] = await Promise.all([
		loadRemoteCaseStudy(fetch, env.PROJECTS_API_URL, env.PROJECTS_API_TOKEN, slug),
		loadRemoteStations(fetch, env.PROJECTS_API_URL, env.PROJECTS_API_TOKEN)
	]);
	// Remote wins on the same slug when it carries content; a bare remote listing
	// never replaces a richer local case study.
	const remoteHasContent =
		!!remoteStudy && (remoteStudy.sections.length > 0 || !!remoteStudy.overviewText);
	const study = (remoteHasContent ? remoteStudy : loadLocalCaseStudy(slug)) ?? remoteStudy;
	if (!study) error(404, 'We could not find that project.');

	const all = mergeStations(loadLocalStations(), remoteStations).filter((s) => !s.external);
	const i = all.findIndex((s) => s.slug === slug);
	const next = all.length > 1 ? all[(i + 1) % all.length] : null;

	return { study, next: next && next.slug !== slug ? next : null };
};
