import { auth, db } from './config';
import type { Profile } from '$lib/stores/profile';
import type { Project } from '$lib/stores/projects';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { loading } from '$lib/stores/loading';
import type { ContactConfig } from '$lib/stores/contact';

export async function saveProfile(userId: string, profileData: Profile) {
    loading.show();
    try {
        await setDoc(doc(db, 'profiles', userId), profileData);
        return true;
    } catch (error) {
        console.error('Error saving profile:', error);
        return false;
    } finally {
        loading.hide();
    }
}

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

export async function saveProjects(userId: string, projectsData: Project[]) {
    loading.show();
    try {
        await setDoc(doc(db, 'projects', userId), { projects: projectsData });
        return true;
    } catch (error) {
        console.error('Error saving projects:', error);
        return false;
    } finally {
        loading.hide();
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
        // Check if collections exist
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
        // Initialize profiles collection
        const profileRef = doc(db, 'profiles', userId);
        const profileSnapshot = await getDoc(profileRef);
        
        if (!profileSnapshot.exists()) {
            const defaultProfile = {
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
            await setDoc(profileRef, defaultProfile);
        }

        // Initialize projects collection
        const projectsRef = doc(db, 'projects', userId);
        const projectsSnapshot = await getDoc(projectsRef);

        if (!projectsSnapshot.exists()) {
            const defaultProjects = {
                projects: [
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
                    }
                    // ... other projects
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
// Add these functions to your existing database.ts file

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