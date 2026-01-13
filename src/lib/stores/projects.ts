import { writable } from 'svelte/store';
import { auth, db } from '$lib/firebase/config';
import { doc, setDoc, onSnapshot, collection, getDocs } from 'firebase/firestore';

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    url?: string;
    github?: string;
    featured?: boolean;
}

function createProjectsStore() {
    const { subscribe, set } = writable<Project[]>([]);
    let unsubscribe: (() => void) | null = null;
    let isLoading = false;
    let loadPromise: Promise<void> | null = null;

    return {
        subscribe,
        set: async (value: Project[]) => {
            try {
                if (!auth.currentUser) {
                    throw new Error('Authentication required to save projects');
                }
                await setDoc(doc(db, 'projects', auth.currentUser.uid), { projects: value });
                set(value);
            } catch (error) {
                console.error('Error saving projects:', error);
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

                    if (auth.currentUser) {
                        unsubscribe = onSnapshot(
                            doc(db, 'projects', auth.currentUser.uid),
                            (doc) => {
                                if (doc.exists()) {
                                    const projects = doc.data().projects || [];
                                    set(projects);
                                } else {
                                    set([]);
                                }
                            },
                            (error) => {
                                console.error('Projects listener error:', error);
                                set([]);
                            }
                        );
                    } else {
                        try {
                            const projectsRef = collection(db, 'projects');
                            const projectsSnapshot = await getDocs(projectsRef);
                            
                            if (!projectsSnapshot.empty) {
                                const firstDoc = projectsSnapshot.docs[0];
                                const projects = firstDoc.data().projects || [];
                                set(projects);
                            } else {
                                set([]);
                            }
                        } catch (error) {
                            console.error('Error fetching public projects:', error);
                            set([]);
                        }
                    }
                } catch (error) {
                    console.error('Error loading projects:', error);
                    set([]);
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

export const projects = createProjectsStore();
