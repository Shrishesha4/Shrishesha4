import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createThemeStore = () => {
    const { subscribe, set } = writable('light');

    return {
        subscribe,
        init: () => {
            if (browser) {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const storedTheme = localStorage.getItem('theme') || systemTheme;
                set(storedTheme);
                document.documentElement.classList.toggle('dark', storedTheme === 'dark');

                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    const newTheme = e.matches ? 'dark' : 'light';
                    set(newTheme);
                    localStorage.setItem('theme', newTheme);
                    document.documentElement.classList.toggle('dark', newTheme === 'dark');
                });
            }
        },
        toggle: () => {
            if (browser) {
                const current = localStorage.getItem('theme') || 'light';
                const newTheme = current === 'light' ? 'dark' : 'light';
                set(newTheme);
                localStorage.setItem('theme', newTheme);
                document.documentElement.classList.toggle('dark', newTheme === 'dark');
            }
        }
    };
};

export const theme = createThemeStore();