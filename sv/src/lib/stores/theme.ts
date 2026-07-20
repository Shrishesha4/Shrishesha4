import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export type ThemeMode = 'light' | 'dark' | 'system';

const createThemeStore = () => {
    const { subscribe, set } = writable<'light' | 'dark'>('dark');
    
    // Track if user has explicitly chosen a theme or is using system
    let userPreference: ThemeMode = 'system';
    let mediaQuery: MediaQueryList | null = null;
    let handleChange: ((e: MediaQueryListEvent) => void) | null = null;

    const getSystemTheme = (): 'light' | 'dark' => {
        if (!browser) return 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (newTheme: 'light' | 'dark') => {
        if (!browser) return;
        
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        set(newTheme);
    };

    const setupSystemListener = () => {
        if (!browser) return;
        
        // Clean up existing listener
        if (mediaQuery && handleChange) {
            mediaQuery.removeEventListener('change', handleChange);
        }
        
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        handleChange = (e: MediaQueryListEvent) => {
            // Always update when in system mode
            if (userPreference === 'system') {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
    };

    return {
        subscribe,
        init: () => {
            if (!browser) return;
            
            // Check localStorage for user's explicit preference
            const stored = localStorage.getItem('theme-preference') as ThemeMode | null;
            userPreference = stored || 'system';
            
            // Determine initial theme
            let initialTheme: 'light' | 'dark';
            if (userPreference === 'system') {
                initialTheme = getSystemTheme();
            } else {
                initialTheme = userPreference as 'light' | 'dark';
            }
            
            applyTheme(initialTheme);
            
            // Set up system theme change listener
            setupSystemListener();
        },
        toggle: () => {
            if (!browser) return;
            
            const currentTheme = get({ subscribe });
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // User explicitly chose a theme, save preference
            userPreference = newTheme;
            localStorage.setItem('theme-preference', newTheme);
            
            applyTheme(newTheme);
        },
        setSystemPreference: () => {
            if (!browser) return;
            
            // Reset to follow system
            userPreference = 'system';
            localStorage.setItem('theme-preference', 'system');
            
            const systemTheme = getSystemTheme();
            applyTheme(systemTheme);
        },
        getMode: (): ThemeMode => userPreference,
        cleanup: () => {
            if (mediaQuery && handleChange) {
                mediaQuery.removeEventListener('change', handleChange);
            }
        }
    };
};

export const theme = createThemeStore();