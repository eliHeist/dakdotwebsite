import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Deployed on Vercel. The runtime is pinned so builds don't depend on the
		// Node version Vercel happens to build with.
		adapter: adapter({ runtime: 'nodejs24.x' })
	}
};

export default config;
