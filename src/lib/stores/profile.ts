import { writable } from 'svelte/store';
import { saveProfile } from '$lib/firebase/database';
import { auth } from '$lib/firebase/config';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
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
    typingStrings: string[]; // Add this new field
}

export const defaultProfile: Profile = {
    name: "",
    title: "",
    bio: "",
    skills: [],
    experience: [],
    education: [],
    typingStrings: ['a Web Developer.', 'a Graphic Designer.', 'an App Developer.']
};

function createProfileStore() {
    const { subscribe, set } = writable<Profile>(defaultProfile);
    let unsubscribe: (() => void) | null = null;

    return {
        subscribe,
        set: async (value: Profile) => {
            try {
                if (!auth.currentUser) {
                    throw new Error('Authentication required to save profile');
                }
                await saveProfile(auth.currentUser.uid, value);
                set(value);
            } catch (error) {
                console.error('Error saving profile:', error);
                throw error;
            }
        },
        load: async () => {
            try {
                if (unsubscribe) {
                    unsubscribe();
                }

                if (auth.currentUser) {
                    unsubscribe = onSnapshot(doc(db, 'profiles', auth.currentUser.uid), (doc) => {
                        if (doc.exists()) {
                            set(doc.data() as Profile);
                        }
                    });
                } else {
                    const profilesRef = collection(db, 'profiles');
                    const profileSnapshot = await getDocs(profilesRef);
                    
                    if (!profileSnapshot.empty) {
                        const firstDoc = profileSnapshot.docs[0];
                        set(firstDoc.data() as Profile);
                    }
                }
            } catch (error) {
                console.error('Error loading profile:', error);
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

export const profile = createProfileStore();