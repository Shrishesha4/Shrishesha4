import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error';

interface Toast {
    message: string;
    type: ToastType;
}

function createToastStore() {
    const { subscribe, set } = writable<Toast | null>(null);
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return {
        subscribe,
        show: (message: string, type: ToastType) => {
            // Clear any existing timeout to prevent timer stacking
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            set({ message, type });
            timeoutId = setTimeout(() => {
                set(null);
                timeoutId = null;
            }, 3000);
        },
        dismiss: () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            set(null);
        }
    };
}

export const toast = createToastStore();