import { writable } from 'svelte/store';
import { auth, db } from '$lib/firebase/config';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export interface RSSFeedSource {
    id: string;
    title: string;
    url: string;
    enabled: boolean;
    createdAt: string;
}

export interface RSSFeedItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    source: string;
    sourceTitle: string;
    content?: string;
    image?: string;
}

function createRSSFeedsStore() {
    const { subscribe, set } = writable<RSSFeedSource[]>([]);
    let unsubscribe: (() => void) | null = null;

    // Default RSS feeds to seed the database
    const defaultFeeds: RSSFeedSource[] = [
        {
            id: crypto.randomUUID(),
            title: 'New York Times',
            url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
            enabled: true,
            createdAt: new Date().toISOString()
        },
        {
            id: crypto.randomUUID(),
            title: 'BBC News',
            url: 'https://feeds.bbci.co.uk/news/rss.xml',
            enabled: true,
            createdAt: new Date().toISOString()
        },
        {
            id: crypto.randomUUID(),
            title: 'Reddit Technology',
            url: 'https://www.reddit.com/r/technology/.rss',
            enabled: true,
            createdAt: new Date().toISOString()
        },
        {
            id: crypto.randomUUID(),
            title: 'The Verge',
            url: 'https://www.theverge.com/rss/index.xml',
            enabled: true,
            createdAt: new Date().toISOString()
        },
        {
            id: crypto.randomUUID(),
            title: 'Ars Technica',
            url: 'https://feeds.arstechnica.com/arstechnica/index',
            enabled: true,
            createdAt: new Date().toISOString()
        },
        {
            id: crypto.randomUUID(),
            title: 'Engadget',
            url: 'https://www.engadget.com/rss.xml',
            enabled: true,
            createdAt: new Date().toISOString()
        }
    ];

    return {
        subscribe,
        set: async (value: RSSFeedSource[]) => {
            try {
                if (!auth.currentUser) {
                    throw new Error('Authentication required to save RSS feeds');
                }
                await setDoc(doc(db, 'rssFeeds', auth.currentUser.uid), { feeds: value });
                set(value);
            } catch (error) {
                console.error('Error saving RSS feeds:', error);
                throw error;
            }
        },
        load: async () => {
            try {
                if (unsubscribe) {
                    unsubscribe();
                }

                if (auth.currentUser) {
                    unsubscribe = onSnapshot(
                        doc(db, 'rssFeeds', auth.currentUser.uid),
                        async (docSnap) => {
                            if (docSnap.exists()) {
                                const feeds = docSnap.data().feeds || [];
                                set(feeds);
                            } else {
                                // Initialize with default feeds
                                await setDoc(doc(db, 'rssFeeds', auth.currentUser!.uid), { feeds: defaultFeeds });
                                set(defaultFeeds);
                            }
                        },
                        (error) => {
                            console.error('RSS feeds listener error:', error);
                            set([]);
                        }
                    );
                } else {
                    set([]);
                }
            } catch (error) {
                console.error('Error loading RSS feeds:', error);
                set([]);
            }
        },
        add: async (feed: Omit<RSSFeedSource, 'id' | 'createdAt'>) => {
            if (!auth.currentUser) {
                throw new Error('Authentication required');
            }
            
            const currentFeeds = await new Promise<RSSFeedSource[]>((resolve) => {
                let unsub: (() => void) | undefined;
                unsub = subscribe((value) => {
                    if (unsub) unsub();
                    resolve(value);
                });
            });
            
            const newFeed: RSSFeedSource = {
                ...feed,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString()
            };
            
            const updatedFeeds = [...currentFeeds, newFeed];
            await setDoc(doc(db, 'rssFeeds', auth.currentUser.uid), { feeds: updatedFeeds });
            set(updatedFeeds);
            return newFeed;
        },
        remove: async (feedId: string) => {
            if (!auth.currentUser) {
                throw new Error('Authentication required');
            }
            
            const currentFeeds = await new Promise<RSSFeedSource[]>((resolve) => {
                let unsub: (() => void) | undefined;
                unsub = subscribe((value) => {
                    if (unsub) unsub();
                    resolve(value);
                });
            });
            
            const updatedFeeds = currentFeeds.filter(f => f.id !== feedId);
            await setDoc(doc(db, 'rssFeeds', auth.currentUser.uid), { feeds: updatedFeeds });
            set(updatedFeeds);
        },
        toggle: async (feedId: string) => {
            if (!auth.currentUser) {
                throw new Error('Authentication required');
            }
            
            const currentFeeds = await new Promise<RSSFeedSource[]>((resolve) => {
                let unsub: (() => void) | undefined;
                unsub = subscribe((value) => {
                    if (unsub) unsub();
                    resolve(value);
                });
            });
            
            const updatedFeeds = currentFeeds.map(f => 
                f.id === feedId ? { ...f, enabled: !f.enabled } : f
            );
            await setDoc(doc(db, 'rssFeeds', auth.currentUser.uid), { feeds: updatedFeeds });
            set(updatedFeeds);
        },
        cleanup: () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    };
}

export const rssFeeds = createRSSFeedsStore();
