import { writable } from 'svelte/store';

export interface Education {
    year: string;
    degree: string;
    institution: string;
}

export interface Profile {
    name: string;
    title: string;
    bio: string;
    skills: string[];
    experience: string[];
    education: Education[];
}

export const defaultProfile: Profile = {
    name: "Shrishesha Narmatesshvara",
    title: "Tech and Software Enthusiast",
    bio: "Hello! I'm a passionate techie with expertise in quite a few technologies and a love for creating elegant solutions to complex problems.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js"],
    experience: [
        "X years of professional software development",
        "Led multiple successful projects",
        "Contributed to open-source communities"
    ],
    education: [
        {
            year: "2023",
            degree: "Master's Degree",
            institution: "University of California, Berkeley"
        },
        {
            year: "2021",
            degree: "Bachelor's Degree",
            institution: "University of Mumbai"
        },
        {
            year: "2017",
            degree: "High School",
            institution: "Mumbai International School"
        }
    ]
};

import { saveProfile, getProfile } from '$lib/firebase/database';
import { auth } from '$lib/firebase/config';

function createProfileStore() {
    const { subscribe, set, update } = writable<Profile>(defaultProfile);

    return {
        subscribe,
        set: async (value: Profile) => {
            try {
                if (auth.currentUser) {
                    await saveProfile(auth.currentUser.uid, value);
                }
                set(value);
            } catch (error) {
                console.error('Error saving profile:', error);
                throw error;
            }
        },
        load: async () => {
            try {
                if (auth.currentUser) {
                    const profile = await getProfile(auth.currentUser.uid);
                    if (profile) {
                        set(profile);
                    }
                }
            } catch (error) {
                console.error('Error loading profile:', error);
                throw error;
            }
        },
        update
    };
}

export const profile = createProfileStore();