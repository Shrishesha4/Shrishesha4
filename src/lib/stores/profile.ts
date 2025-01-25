import { writable } from 'svelte/store';
import { saveProfile, getProfile } from '$lib/firebase/database';
import { auth } from '$lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '$lib/firebase/config';

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
    name: "",
    title: "",
    bio: "",
    skills: [],
    experience: [],
    education: []
};

function createProfileStore() {
    const { subscribe, set } = writable<Profile>(defaultProfile);
    let loaded = false;

    return {
        subscribe,
        set: async (value: Profile) => {
            try {
                if (!auth.currentUser) {
                    throw new Error('Authentication required to save profile');
                }
                await saveProfile(auth.currentUser.uid, value);
                set(value);
                localStorage.setItem('profile', JSON.stringify(value));
            } catch (error) {
                console.error('Error saving profile:', error);
                throw error;
            }
        },
        load: async () => {
            if (loaded) return;
            try {
                // Try local storage first
                const storedProfile = localStorage.getItem('profile');
                if (storedProfile) {
                    set(JSON.parse(storedProfile));
                    loaded = true;
                    return;
                }

                // If not in local storage, get from Firestore without requiring auth
                const profilesRef = collection(db, 'profiles');
                const profilesSnapshot = await getDocs(profilesRef);
                
                if (!profilesSnapshot.empty) {
                    // Get the first profile document
                    const firstDoc = profilesSnapshot.docs[0];
                    const profileData = firstDoc.data();
                    
                    // Ensure the data matches the Profile interface
                    const profile: Profile = {
                        name: profileData.name || defaultProfile.name,
                        title: profileData.title || defaultProfile.title,
                        bio: profileData.bio || defaultProfile.bio,
                        skills: profileData.skills || defaultProfile.skills,
                        experience: profileData.experience || defaultProfile.experience,
                        education: profileData.education || defaultProfile.education
                    };
                    
                    set(profile);
                    loaded = true;
                    localStorage.setItem('profile', JSON.stringify(profile));
                } else {
                    // If no profile exists, use default
                    set(defaultProfile);
                    loaded = true;
                }
            } catch (error) {
                console.error('Error loading profile:', error);
                set(defaultProfile); // Fallback to default profile on error
                loaded = true;
            }
        }
    };
}

export const profile = createProfileStore();