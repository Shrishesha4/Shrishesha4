import { auth } from './config';
import { saveProfile, saveProjects } from './database';
import { defaultProfile } from '$lib/stores/profile';
import { defaultProjects } from '$lib/stores/projects';

interface MigrationResult {
    success: boolean;
    profileMigrated: boolean;
    projectsMigrated: boolean;
    error?: string;
}

export async function migrateDataToFirestore(): Promise<MigrationResult> {
    const result: MigrationResult = {
        success: false,
        profileMigrated: false,
        projectsMigrated: false
    };

    try {
        if (!auth.currentUser) {
            throw new Error('User not authenticated');
        }
        await saveProfile(auth.currentUser.uid, defaultProfile);
        result.profileMigrated = true;
        await saveProjects(auth.currentUser.uid, defaultProjects);
        result.projectsMigrated = true;
        result.success = true;
        console.log('Data migration completed successfully');
        return result;
    } catch (error) {
        console.error('Error migrating data:', error);
        result.error = error instanceof Error ? error.message : 'Unknown error occurred';
        return result;
    }
}