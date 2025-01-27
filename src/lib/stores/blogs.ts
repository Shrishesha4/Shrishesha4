import { writable } from 'svelte/store';
import { auth, db } from '$lib/firebase/config';
import { collection, getDocs, setDoc, doc, onSnapshot } from 'firebase/firestore';

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

    return {
        subscribe,
        set: async (value: Blog[]) => {
            try {
                if (!auth.currentUser) {
                    throw new Error('Authentication required to save blogs');
                }
                await setDoc(doc(db, 'blogs', auth.currentUser.uid), { blogs: value });
                set(value);
            } catch (error) {
                console.error('Error saving blogs:', error);
                throw error;
            }
        },
        load: async () => {
            try {
                // Unsubscribe from any existing listener
                if (unsubscribe) {
                    unsubscribe();
                }

                // Set up real-time listener
                if (auth.currentUser) {
                    unsubscribe = onSnapshot(doc(db, 'blogs', auth.currentUser.uid), (doc) => {
                        if (doc.exists()) {
                            const blogs = doc.data().blogs || [];
                            set(blogs);
                        } else {
                            set([]);
                        }
                    }, (error) => {
                        console.error('Error in blogs listener:', error);
                    });
                } else {
                    // For public access, get all blogs
                    const blogsRef = collection(db, 'blogs');
                    const blogsSnapshot = await getDocs(blogsRef);
                    
                    if (!blogsSnapshot.empty) {
                        const firstDoc = blogsSnapshot.docs[0];
                        const blogs = firstDoc.data().blogs || [];
                        set(blogs);
                    }
                }
            } catch (error) {
                console.error('Error loading blogs:', error);
                throw error;
            }
        },
        cleanup: () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    };
}

export const blogs = createBlogsStore();