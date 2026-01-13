import { writable } from 'svelte/store';
import { db } from '$lib/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

export interface SocialLink {
    id: string;
    platform: string;
    label: string;
    url: string;
    icon: string;
    order: number;
    enabled: boolean;
}

export interface SocialLinksConfig {
    links: SocialLink[];
}

const defaultConfig: SocialLinksConfig = {
    links: []
};

function createSocialLinksStore() {
    const { subscribe, set } = writable<SocialLinksConfig>(defaultConfig);
    let unsubscribe: (() => void) | null = null;

    return {
        subscribe,
        load: async () => {
            try {
                if (unsubscribe) {
                    unsubscribe();
                }

                unsubscribe = onSnapshot(
                    doc(db, 'config', 'socialLinks'),
                    (doc) => {
                        if (doc.exists()) {
                            const data = doc.data() as SocialLinksConfig;
                            // Sort by order and filter only enabled links
                            const sortedLinks = [...(data.links || [])]
                                .filter(link => link.enabled)
                                .sort((a, b) => a.order - b.order);
                            set({ links: sortedLinks });
                        } else {
                            set(defaultConfig);
                        }
                    },
                    (error) => {
                        console.error('Social links listener error:', error);
                        set(defaultConfig);
                    }
                );
            } catch (error) {
                console.error('Error loading social links:', error);
                set(defaultConfig);
            }
        },
        cleanup: () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    };
}

export const socialLinks = createSocialLinksStore();
