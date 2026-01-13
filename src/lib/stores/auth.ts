import { writable } from 'svelte/store';
import { auth } from '$lib/firebase/config';
import { 
    setPersistence, 
    browserLocalPersistence, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail 
} from 'firebase/auth';

export const authState = writable(false);

const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') === 'true' : false;
export const isAuthenticated = writable(storedAuth);

// Store unsubscribe functions to prevent memory leaks
let authUnsubscribe: (() => void) | null = null;
let storeUnsubscribe: (() => void) | null = null;
let isInitialized = false;

// Initialize auth - call this from the app layout
export function initAuth() {
    if (isInitialized || typeof window === 'undefined') return;
    isInitialized = true;

    setPersistence(auth, browserLocalPersistence).catch(console.error);

    storeUnsubscribe = isAuthenticated.subscribe(value => {
        localStorage.setItem('isAuthenticated', value.toString());
    });

    authUnsubscribe = onAuthStateChanged(auth, (user) => {
        isAuthenticated.set(!!user);
    });
}

// Cleanup auth subscriptions - call this when the app unmounts
export function cleanupAuth() {
    if (authUnsubscribe) {
        authUnsubscribe();
        authUnsubscribe = null;
    }
    if (storeUnsubscribe) {
        storeUnsubscribe();
        storeUnsubscribe = null;
    }
    isInitialized = false;
}

// Auto-initialize in browser (but can be cleaned up later)
if (typeof window !== 'undefined') {
    initAuth();
}

export async function login(username: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, username, password);
        isAuthenticated.set(true);
    } catch (error) {
        console.error('Firebase auth error:', error);
        throw new Error('Invalid credentials');
    }
}

export async function resetPassword(email: string) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: 'Password reset email sent successfully' };
    } catch (error) {
        console.error('Password reset error:', error);
        throw new Error('Failed to send password reset email');
    }
}

export async function logout() {
    await auth.signOut();
    isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
}
