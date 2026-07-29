import { getApps, initializeApp, cert, type App, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { env } from '$env/dynamic/private';
import { readFileSync } from 'node:fs';

function loadServiceAccount(): ServiceAccount {
	if (env.FIREBASE_SERVICE_ACCOUNT_PATH) {
		return JSON.parse(readFileSync(env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8')) as ServiceAccount;
	}
	if (env.FIREBASE_SERVICE_ACCOUNT) {
		return JSON.parse(env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
	}
	throw new Error('Firebase Admin credentials are not configured');
}

function getAdminApp(): App {
	const existing = getApps()[0];
	if (existing) return existing;

	return initializeApp({
		credential: cert(loadServiceAccount())
	});
}

export function getAdminDb() {
	return getFirestore(getAdminApp());
}
