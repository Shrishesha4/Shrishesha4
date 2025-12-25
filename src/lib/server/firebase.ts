import admin from 'firebase-admin';
import { env } from '$env/dynamic/private';

try {
    if (!admin.apps.length) {
        // Check if the service account env var is present
        if (env.FIREBASE_SERVICE_ACCOUNT) {
            const serviceAccount = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } else {
            console.warn('FIREBASE_SERVICE_ACCOUNT not found in environment variables. Server-side Firebase features will not work.');
        }
    }
} catch (error) {
    console.error('Firebase Admin initialization error:', error);
}

export const adminAuth = admin.apps.length ? admin.auth() : null;
export const adminDb = admin.apps.length ? admin.firestore() : null;
