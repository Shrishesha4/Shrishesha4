import { writable } from 'svelte/store';
import { saveProfile } from '$lib/firebase/database';
import { auth, db } from '$lib/firebase/config';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

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
    typingStrings: string[];
}

export const defaultProfile: Profile = {
    name: "",
    title: "",
    bio: "",
    skills: [],
    experience: [],
    education: [],
    typingStrings: ['']
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

                const profilesRef = collection(db, 'profiles');
                const profileSnapshot = await getDocs(profilesRef);
                
                if (!profileSnapshot.empty) {
                    const firstDoc = profileSnapshot.docs[0];
                    unsubscribe = onSnapshot(
                        doc(db, 'profiles', firstDoc.id),
                        (docSnapshot) => {
                            if (docSnapshot.exists()) {
                                set(docSnapshot.data() as Profile);
                            } else {
                                set(defaultProfile);
                            }
                        },
                        (error) => {
                            console.error('Profile snapshot error:', error);
                            set(defaultProfile);
                        }
                    );
                } else {
                    set(defaultProfile);
                }
            } catch (error) {
                console.error('Error loading profile:', error);
                set(defaultProfile);
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