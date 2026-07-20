import { writable } from 'svelte/store';
import { db } from '$lib/firebase/config';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

export interface ContactConfig {
    spreadsheetUrl: string;
    email: string;
    phone?: string;
    location?: string;
}

const defaultConfig: ContactConfig = {
    spreadsheetUrl: '',
    email: '',
    phone: '',
    location: ''
};

function createContactStore() {
    const { subscribe, set } = writable<ContactConfig>(defaultConfig);
    let unsubscribe: (() => void) | null = null;
    let isLoading = false;
    let loadPromise: Promise<void> | null = null;

    return {
        subscribe,
        set: async (value: ContactConfig) => {
            try {
                await setDoc(doc(db, 'config', 'contact'), value);
                set(value);
            } catch (error) {
                console.error('Error saving contact config:', error);
                throw error;
            }
        },
        load: async () => {
            // Prevent concurrent loads - return existing promise if already loading
            if (isLoading && loadPromise) {
                return loadPromise;
            }
            
            isLoading = true;
            loadPromise = (async () => {
                try {
                    if (unsubscribe) {
                        unsubscribe();
                    }

                    unsubscribe = onSnapshot(
                        doc(db, 'config', 'contact'),
                        (doc) => {
                            if (doc.exists()) {
                                set(doc.data() as ContactConfig);
                            } else {
                                set(defaultConfig);
                            }
                        },
                        (error) => {
                            console.error('Contact config listener error:', error);
                            set(defaultConfig); // Set default config on error
                        }
                    );
                } catch (error) {
                    console.error('Error loading contact config:', error);
                    set(defaultConfig); // Set default config on error
                } finally {
                    isLoading = false;
                }
            })();
            
            return loadPromise;
        },
        cleanup: () => {
            if (unsubscribe) {
                unsubscribe();
                unsubscribe = null;
            }
            isLoading = false;
            loadPromise = null;
        }
    };
}

export const contact = createContactStore();