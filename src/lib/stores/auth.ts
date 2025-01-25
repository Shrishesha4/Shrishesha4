import { writable } from 'svelte/store';
import { auth } from '$lib/firebase/config';
import { setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { verifyPassword } from '$lib/utils/auth';

// Create a writable store for authentication state
export const authState = writable(false);

// Initialize store with localStorage value if exists
const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') === 'true' : false;
export const isAuthenticated = writable(storedAuth);

// Set persistence to local
setPersistence(auth, browserLocalPersistence);

// Listen to auth state and sync with localStorage
isAuthenticated.subscribe(value => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', value.toString());
    }
});

// Listen to Firebase auth state changes
onAuthStateChanged(auth, (user) => {
    const authState = !!user;
    isAuthenticated.set(authState);
});

const STORED_HASH = '$2a$10$Ug7AA2Nh0.0QgVRYV.0BPO1iu9TshV4LizDrLscSRrkFoLVxQRFP.';
const VALID_USERNAME = 'admin@shesha.in';

export async function login(username: string, password: string) {
    if (username !== VALID_USERNAME) {
        throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(password, STORED_HASH);
    if (!isValid) {
        throw new Error('Invalid credentials');
    }

    try {
        // Sign in with Firebase
        await signInWithEmailAndPassword(auth, username, password);
        isAuthenticated.set(true);
    } catch (error) {
        console.error('Firebase auth error:', error);
        throw new Error('Authentication failed');
    }
}

export async function logout() {
    await auth.signOut();
    isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
}
