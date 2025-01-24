import { writable } from 'svelte/store';
import { saveProfile, getProfile } from '$lib/firebase/database';
import { auth } from '$lib/firebase/config';

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

function createProfileStore() {
    const { subscribe, set, update } = writable<Profile>({
        name: '',
        title: '',
        bio: '',
        skills: [],
        experience: [],
        education: []
    });

    let loaded = false;

    return {
        subscribe,
        set: async (value: Profile) => {
            try {
                if (auth.currentUser) {
                    await saveProfile(auth.currentUser.uid, value);
                }
                set(value);
                // Save to local storage
                localStorage.setItem('profile', JSON.stringify(value));
            } catch (error) {
                console.error('Error saving profile:', error);
                throw error;
            }
        },
        load: async () => {
            if (loaded) return;
            try {
                // Load from local storage first
                const storedProfile = localStorage.getItem('profile');
                if (storedProfile) {
                    set(JSON.parse(storedProfile));
                    loaded = true;
                    return;
                }

                if (auth.currentUser) {
                    const profile = await getProfile(auth.currentUser.uid);
                    if (profile) {
                        set(profile);
                        loaded = true;
                        // Save to local storage
                        localStorage.setItem('profile', JSON.stringify(profile));
                    }
                }
            } catch (error) {
                console.error('Error loading profile:', error);
                throw error;
            }
        }
    };
}

export const profile = createProfileStore();