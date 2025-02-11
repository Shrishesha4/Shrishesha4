import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const createThemeStore = () => {
    const { subscribe, set } = writable('dark');

    return {
        subscribe,
        init: () => {
            if (browser) {
                set('dark');
                localStorage.setItem('theme', 'dark');
                document.documentElement.classList.add('dark');
            }
        },
        toggle: () => {
            // Disable theme toggle functionality
            return;
        }
    };
};

export const theme = createThemeStore();