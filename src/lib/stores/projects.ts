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
}

function createProjectsStore() {
    const { subscribe, set } = writable<Project[]>([]);
    let unsubscribe: (() => void) | null = null;

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
            try {
                if (unsubscribe) {
                    unsubscribe();
                }

                if (auth.currentUser) {
                    unsubscribe = onSnapshot(doc(db, 'projects', auth.currentUser.uid), (doc) => {
                        if (doc.exists()) {
                            const projects = doc.data().projects || [];
                            set(projects);
                        } else {
                            set([]);
                        }
                    });
                } else {
                    const projectsRef = collection(db, 'projects');
                    const projectsSnapshot = await getDocs(projectsRef);
                    
                    if (!projectsSnapshot.empty) {
                        const firstDoc = projectsSnapshot.docs[0];
                        const projects = firstDoc.data().projects || [];
                        set(projects);
                    }
                }
            } catch (error) {
                console.error('Error loading projects:', error);
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

export const projects = createProjectsStore();
