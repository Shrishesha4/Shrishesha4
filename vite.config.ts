import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    build: {
        target: 'esnext',
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['axios', 'firebase/app', 'firebase/auth'],
                    'ui': ['@melt-ui/svelte']
                }
            }
        }
    },
    ssr: {
        noExternal: ['@melt-ui/svelte']
    }
});
