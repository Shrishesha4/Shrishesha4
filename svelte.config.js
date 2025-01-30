import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
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