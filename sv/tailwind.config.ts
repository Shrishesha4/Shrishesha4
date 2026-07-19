import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#f5f5f5',
                    medium: '#1a1a1a',
                    dark: '#0a0a0a',
                },
                dark: '#171717',
                medium: '#262626',
                light: '#404040'
            }
        }
    },
    plugins: [
        forms,
        typography,
        require('flowbite/plugin')
    ]
} satisfies Config;
