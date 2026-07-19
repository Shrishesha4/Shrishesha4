import { writable, get } from 'svelte/store';
import { db } from '$lib/firebase/config';
import { doc, onSnapshot, collection, getDocs } from 'firebase/firestore';

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
    let loadPromise: Promise<Project[]> | null = null;
    let isInitialized = false;

    return {
        subscribe,
        load: async (): Promise<Project[]> => {
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
            loadPromise = new Promise<Project[]>(async (resolve) => {
                try {
                    if (unsubscribe) {
                        unsubscribe();
                    }

                    // Fetch public projects data
                    const projectsRef = collection(db, 'projects');
                    const projectsSnapshot = await getDocs(projectsRef);
                    
                    if (!projectsSnapshot.empty) {
                        const firstDoc = projectsSnapshot.docs[0];
                        
                        // Set up real-time listener for updates
                        // First callback will resolve the promise with initial data
                        let firstLoad = true;
                        unsubscribe = onSnapshot(
                            doc(db, 'projects', firstDoc.id),
                            (docSnapshot) => {
                                if (docSnapshot.exists()) {
                                    const projects = docSnapshot.data().projects || [];
                                    set(projects);
                                    if (firstLoad) {
                                        firstLoad = false;
                                        isInitialized = true;
                                        isLoading = false;
                                        resolve(projects);
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
                                console.error('Projects listener error:', error);
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
                    console.error('Error loading projects:', error);
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

export const projects = createProjectsStore();
