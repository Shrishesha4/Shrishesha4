import { auth, db } from './config';
import type { Profile } from '$lib/stores/profile';
import type { Project } from '$lib/stores/projects';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { loading } from '$lib/stores/loading';
import type { ContactConfig } from '$lib/stores/contact';

export async function getProfile(userId: string): Promise<Profile | null> {
    loading.show();
    try {
        const docRef = doc(db, 'profiles', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() as Profile : null;
    } catch (error) {
        console.error('Error getting profile:', error);
        return null;
    } finally {
        loading.hide();
    }
}

export async function saveProfile(userId: string, profile: Profile) {
    try {
        await setDoc(doc(db, 'profiles', userId), profile);
        return true;
    } catch (error) {
        console.error('Error saving profile:', error);
        throw error;
    }
}

export async function saveProjects(userId: string, projects: Project[]) {
    try {
        await setDoc(doc(db, 'projects', userId), { projects });
        return true;
    } catch (error) {
        console.error('Error saving projects:', error);
        throw error;
    }
}


export async function getProjects(userId: string): Promise<Project[]> {
    loading.show();
    try {
        const docRef = doc(db, 'projects', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().projects : [];
    } catch (error) {
        console.error('Error getting projects:', error);
        return [];
    } finally {
        loading.hide();
    }
}

export async function checkFirestoreConnection(): Promise<boolean> {
    try {
        const testDoc = doc(db, '_test_connection', 'test');
        await setDoc(testDoc, { timestamp: new Date() });
        await getDoc(testDoc);
        return true;
    } catch (error) {
        console.error('Firestore connection test failed:', error);
        return false;
    }
}

export async function verifyCollections(): Promise<{
    profilesExist: boolean;
    projectsExist: boolean;
    error?: string;
}> {
    try {
        const profilesRef = collection(db, 'profiles');
        const projectsRef = collection(db, 'projects');
        
        const profileDocs = await getDocs(profilesRef);
        const projectDocs = await getDocs(projectsRef);

        return {
            profilesExist: !profileDocs.empty,
            projectsExist: !projectDocs.empty
        };
    } catch (error) {
        console.error('Collection verification failed:', error);
        return {
            profilesExist: false,
            projectsExist: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

export async function initializeFirestore(userId: string) {
    try {
        const profileRef = doc(db, 'profiles', userId);
        const profileSnapshot = await getDoc(profileRef);
        
        if (!profileSnapshot.exists()) {
            const defaultProfile = {
                name: "",
                title: "",
                bio: "",
                skills: ["", "", "", ""],
                experience: [
                    ""
                ],
                education: [
                    {
                        year: "",
                        degree: "",
                        institution: ""
                    }
                ],
                typingStrings: [
                    "",
                    "",
                    "",
                    ""
                ]
            };
            await setDoc(profileRef, defaultProfile);
        }

        const projectsRef = doc(db, 'projects', userId);
        const projectsSnapshot = await getDoc(projectsRef);

        if (!projectsSnapshot.exists()) {
            const defaultProjects = {
                projects: [
                            {
                                id: 'dino',
                                title: 'Chrome Dino',
                                description: 'A recreation of the popular Chrome browser dinosaur game with enhanced features',
                                image: '/images/portfolio/portfolio-1.jpg',
                                technologies: ['JavaScript', 'HTML5', 'CSS3', 'Game Development'],
                                github: 'https://github.com/Shrishesha4/chrome-dino/tree/main'
                            }
                ]
            };
            await setDoc(projectsRef, defaultProjects);
        }

        return true;
    } catch (error) {
        console.error('Error initializing Firestore:', error);
        return false;
    }
}

export async function debugFirestore() {
    try {
        console.log('Testing Firestore connection...');
        
        // Check auth state
        console.log('Current user:', auth.currentUser?.uid);
        
        // Check if collections exist
        const profileRef = collection(db, 'profiles');
        const projectsRef = collection(db, 'projects');
        
        const profileDocs = await getDocs(profileRef);
        const projectDocs = await getDocs(projectsRef);
        
        return {
            success: true,
            userId: auth.currentUser?.uid,
            isConnected: true,
            collections: {
                profiles: !profileDocs.empty,
                projects: !projectDocs.empty
            }
        };
    } catch (error) {
        console.error('Firestore debug error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            isConnected: false
        };
    }
}

export async function saveContactConfig(config: ContactConfig) {
    loading.show();
    try {
        await setDoc(doc(db, 'config', 'contact'), config);
        return true;
    } catch (error) {
        console.error('Error saving contact config:', error);
        return false;
    } finally {
        loading.hide();
    }
}

export async function getContactConfig(): Promise<ContactConfig | null> {
    loading.show();
    try {
        const docRef = doc(db, 'config', 'contact');
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() as ContactConfig : null;
    } catch (error) {
        console.error('Error getting contact config:', error);
        return null;
    } finally {
        loading.hide();
    }
}