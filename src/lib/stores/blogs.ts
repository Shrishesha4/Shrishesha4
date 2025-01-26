import { writable } from 'svelte/store';
import { auth, db } from '$lib/firebase/config';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

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
    let loaded = false;

    return {
        subscribe,
        set: async (value: Blog[]) => {
            try {
                if (!auth.currentUser) {
                    throw new Error('Authentication required to save blogs');
                }
                await setDoc(doc(db, 'blogs', auth.currentUser.uid), { blogs: value });
                set(value);
                localStorage.setItem('blogs', JSON.stringify(value));
            } catch (error) {
                console.error('Error saving blogs:', error);
                throw error;
            }
        },
        load: async () => {
            if (loaded) return;
            try {
                const storedBlogs = localStorage.getItem('blogs');
                if (storedBlogs) {
                    set(JSON.parse(storedBlogs));
                    loaded = true;
                    return;
                }

                const blogsRef = collection(db, 'blogs');
                const blogsSnapshot = await getDocs(blogsRef);
                
                if (!blogsSnapshot.empty) {
                    const firstDoc = blogsSnapshot.docs[0];
                    const blogs = firstDoc.data().blogs || [];
                    set(blogs);
                    loaded = true;
                    localStorage.setItem('blogs', JSON.stringify(blogs));
                }
            } catch (error) {
                console.error('Error loading blogs:', error);
                throw error;
            }
        }
    };
}

export const blogs = createBlogsStore();