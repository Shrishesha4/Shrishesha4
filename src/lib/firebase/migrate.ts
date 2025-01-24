import { auth } from './config';
import { saveProfile, saveProjects } from './database';
import { defaultProfile } from '$lib/stores/profile';
import { defaultProjects } from '$lib/stores/projects';

export async function migrateDataToFirestore() {
    try {
        if (!auth.currentUser) {
            throw new Error('User not authenticated');
        }

        // Migrate profile data
        await saveProfile(auth.currentUser.uid, defaultProfile);

        // Migrate projects data
        await saveProjects(auth.currentUser.uid, defaultProjects);

        console.log('Data migration completed successfully');
        return true;
    } catch (error) {
        console.error('Error migrating data:', error);
        return false;
    }
}