import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error';

interface Toast {
    message: string;
    type: ToastType;
}

function createToastStore() {
    const { subscribe, set } = writable<Toast | null>(null);

    return {
        subscribe,
        show: (message: string, type: ToastType) => {
            console.log('Toast.show called:', message, type);
            set({ message, type });
            setTimeout(() => set(null), 3000);
        }
    };
}

export const toast = createToastStore();