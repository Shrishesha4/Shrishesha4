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
                    'ui': ['@melt-ui/svelte']
                }
            }
        }
    },
    ssr: {
        noExternal: ['@melt-ui/svelte']
    },
    resolve: {
        alias: {
            crypto: 'crypto-js'
        }
    },
    optimizeDeps: {
        include: ['@melt-ui/svelte']
    }
});
