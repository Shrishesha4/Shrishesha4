import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            runtime: 'nodejs22.x'
        }),
        csrf: {
            checkOrigin: false,
        }
    },
    preprocess: sequence([
        vitePreprocess(),
        preprocessMeltUI()
    ])
};

export default config;