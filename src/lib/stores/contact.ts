import { writable } from 'svelte/store';
import { db } from '$lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface ContactConfig {
    spreadsheetUrl: string;
    email: string;
    phone?: string;
    location?: string;
}

// Add this interface to your existing file
export interface ContactMessage {
    id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: Date;
    read: boolean;
}

function createContactStore() {
    const { subscribe, set } = writable<ContactConfig>({
        spreadsheetUrl: '',
        email: '',
        phone: '',
        location: ''
    });
    let loaded = false;

    return {
        subscribe,
        load: async () => {
            if (loaded) return;
            try {
                const docRef = doc(db, 'config', 'contact');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    set(docSnap.data() as ContactConfig);
                }
                loaded = true;
            } catch (error) {
                console.error('Error loading contact config:', error);
                throw error;
            }
        },
        set: async (config: ContactConfig) => {
            try {
                await setDoc(doc(db, 'config', 'contact'), config);
                set(config);
            } catch (error) {
                console.error('Error saving contact config:', error);
                throw error;
            }
        }
    };
}

export const contactConfig = createContactStore();