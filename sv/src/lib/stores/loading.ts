import { writable } from 'svelte/store';

function createLoadingStore() {
    const { subscribe, set } = writable(false);
    
    return {
        subscribe,
        show: () => set(true),
        hide: () => set(false)
    };
}

export const loading = createLoadingStore();