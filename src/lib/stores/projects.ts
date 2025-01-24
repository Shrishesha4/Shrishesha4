import { writable } from 'svelte/store';

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    url?: string;
    github?: string;
}

export const defaultProjects: Project[] = [
    {
        id: 'ssam',
        title: 'Sri Senthil Andavar Motors',
        description: 'A comprehensive web application for Sri Senthil Andavar Motors showcasing their services and products',
        image: '/images/portfolio/portfolio-4.png',
        technologies: ['Web Development', 'Firebase', 'JavaScript'],
        url: 'https://senthilandavar-motors.web.app/'
    },
    {
        id: 'dino',
        title: 'Chrome Dino',
        description: 'A recreation of the popular Chrome browser dinosaur game with enhanced features',
        image: '/images/portfolio/portfolio-1.jpg',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Game Development'],
        github: 'https://github.com/Shrishesha4/chrome-dino/tree/main'
    },
    {
        id: 'ttt',
        title: 'Tic Tac Toe',
        description: 'Interactive Tic Tac Toe game with modern UI and multiplayer support',
        image: '/images/portfolio/portfolio-3.jpg',
        technologies: ['JavaScript', 'Game Development', 'Web Development'],
        github: 'https://github.com/Shrishesha4/TicTacToe'
    },
    {
        id: 'zoom',
        title: 'Zoom Auto Join',
        description: 'Automated solution for joining scheduled Zoom meetings with custom configurations',
        image: '/images/portfolio/portfolio-4.jpg',
        technologies: ['Python', 'Automation', 'Zoom API'],
        github: 'https://github.com/Shrishesha4/ZoomAutoClass'
    }
];

import { saveProjects, getProjects } from '$lib/firebase/database';
import { auth } from '$lib/firebase/config';

function createProjectsStore() {
    let initialData = defaultProjects;
    const { subscribe, set, update } = writable<Project[]>(initialData);

    return {
        subscribe,
        set: async (value: Project[]) => {
            if (auth.currentUser) {
                await saveProjects(auth.currentUser.uid, value);
            }
            set(value);
        },
        load: async () => {
            if (auth.currentUser) {
                const projects = await getProjects(auth.currentUser.uid);
                if (projects.length > 0) {
                    set(projects);
                }
            }
        },
        update
    };
}

export const projects = createProjectsStore();

// Initialize thumbnails if needed
// Remove fetchThumbnails call since it's not defined in the store
if (typeof window !== 'undefined') {
    // Initialize any client-side only logic here if needed
}