import { writable } from 'svelte/store';
import { saveProjects, getProjects } from '$lib/firebase/database';
import { auth, db } from '$lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

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
    let loaded = false;

    return {
        subscribe,
        set: async (value: Project[]) => {
            try {
                if (!auth.currentUser) {
                    throw new Error('Authentication required to save projects');
                }
                await saveProjects(auth.currentUser.uid, value);
                set(value);
                localStorage.setItem('projects', JSON.stringify(value));
            } catch (error) {
                console.error('Error saving projects:', error);
                throw error;
            }
        },
        load: async () => {
            if (loaded) return;
            try {
                // Try local storage first
                const storedProjects = localStorage.getItem('projects');
                if (storedProjects) {
                    set(JSON.parse(storedProjects));
                    loaded = true;
                    return;
                }

                // If not in local storage, get from Firestore
                const projectsRef = collection(db, 'projects');
                const projectsSnapshot = await getDocs(projectsRef);
                
                if (!projectsSnapshot.empty) {
                    const firstDoc = projectsSnapshot.docs[0];
                    const projects = firstDoc.data().projects || [];
                    set(projects);
                    loaded = true;
                    localStorage.setItem('projects', JSON.stringify(projects));
                }
            } catch (error) {
                console.error('Error loading projects:', error);
                throw error;
            }
        }
    };
}

export const projects = createProjectsStore();

// Initialize thumbnails if needed
// Remove fetchThumbnails call since it's not defined in the store
if (typeof window !== 'undefined') {
    // Initialize any client-side only logic here if needed
}