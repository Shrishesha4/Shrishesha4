import { writable } from 'svelte/store';
import { saveProjects, getProjects } from '$lib/firebase/database';
import { auth } from '$lib/firebase/config';

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
                if (auth.currentUser) {
                    await saveProjects(auth.currentUser.uid, value);
                }
                set(value);
                // Save to local storage
                localStorage.setItem('projects', JSON.stringify(value));
            } catch (error) {
                console.error('Error saving projects:', error);
                throw error;
            }
        },
        load: async () => {
            if (loaded) return;
            try {
                // Load from local storage first
                const storedProjects = localStorage.getItem('projects');
                if (storedProjects) {
                    set(JSON.parse(storedProjects));
                    loaded = true;
                    return;
                }

                if (auth.currentUser) {
                    const projects = await getProjects(auth.currentUser.uid);
                    set(projects);
                    loaded = true;
                    // Save to local storage
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