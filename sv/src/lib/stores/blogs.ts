import { writable, get } from 'svelte/store';
import { db } from '$lib/firebase/config';
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';

export interface Blog {
    id: string;
    title: string;
    content: string;
    description: string;
    image?: string;
    date: string;
    tags: string[];
    slug: string;
}

function createBlogsStore() {
    const { subscribe, set } = writable<Blog[]>([]);
    let unsubscribe: (() => void) | null = null;
    let isLoading = false;
    let loadPromise: Promise<Blog[]> | null = null;
    let isInitialized = false;

    return {
        subscribe,
        load: async (): Promise<Blog[]> => {
            // If already initialized with data, return current data
            const currentData = get({ subscribe });
            if (isInitialized && currentData.length > 0) {
                return currentData;
            }
            
            // Prevent concurrent loads - return existing promise if already loading
            if (isLoading && loadPromise) {
                return loadPromise;
            }
            
            isLoading = true;
            loadPromise = new Promise<Blog[]>(async (resolve) => {
                try {
                    if (unsubscribe) {
                        unsubscribe();
                    }

                    // Fetch public blogs data
                    const blogsRef = collection(db, 'blogs');
                    const blogsSnapshot = await getDocs(blogsRef);
                    
                    if (!blogsSnapshot.empty) {
                        const firstDoc = blogsSnapshot.docs[0];
                        
                        // Set up real-time listener for updates
                        // First callback will resolve the promise with initial data
                        let firstLoad = true;
                        unsubscribe = onSnapshot(
                            doc(db, 'blogs', firstDoc.id),
                            (docSnapshot) => {
                                if (docSnapshot.exists()) {
                                    const blogs = docSnapshot.data().blogs || [];
                                    set(blogs);
                                    if (firstLoad) {
                                        firstLoad = false;
                                        isInitialized = true;
                                        isLoading = false;
                                        resolve(blogs);
                                    }
                                } else {
                                    set([]);
                                    if (firstLoad) {
                                        firstLoad = false;
                                        isInitialized = true;
                                        isLoading = false;
                                        resolve([]);
                                    }
                                }
                            },
                            (error) => {
                                console.error('Blogs listener error:', error);
                                set([]);
                                if (firstLoad) {
                                    firstLoad = false;
                                    isLoading = false;
                                    resolve([]);
                                }
                            }
                        );
                    } else {
                        set([]);
                        isInitialized = true;
                        isLoading = false;
                        resolve([]);
                    }
                } catch (error) {
                    console.error('Error loading blogs:', error);
                    set([]);
                    isLoading = false;
                    resolve([]);
                }
            });
            
            return loadPromise;
        },
        cleanup: () => {
            if (unsubscribe) {
                unsubscribe();
                unsubscribe = null;
            }
            isLoading = false;
            loadPromise = null;
            isInitialized = false;
        }
    };
}

export const blogs = createBlogsStore();