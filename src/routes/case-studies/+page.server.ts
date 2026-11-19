import { env } from '$env/dynamic/private';
import { loadLocalStations, loadRemoteStations, mergeStations } from '$lib/data/network';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
	const remote = await loadRemoteStations(fetch, env.PROJECTS_API_URL, env.PROJECTS_API_TOKEN);
	return { stations: mergeStations(loadLocalStations(), remote) };
};
