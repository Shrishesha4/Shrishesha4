import { db } from './config';
import type { Profile } from '$lib/stores/profile';
import type { Project } from '$lib/stores/projects';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
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
        // Just try to read from an existing collection
        const profilesRef = collection(db, 'profiles');
        await getDocs(profilesRef);
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