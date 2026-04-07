import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Target Vercel’s supported runtimes (also avoids local build errors on unsupported Node majors).
			runtime: 'nodejs22.x'
		})
	}
};

export default config;

