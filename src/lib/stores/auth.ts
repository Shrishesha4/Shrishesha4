import { writable } from 'svelte/store';
import { auth } from '$lib/firebase/config';
import { setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export const authState = writable(false);

const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') === 'true' : false;
export const isAuthenticated = writable(storedAuth);

setPersistence(auth, browserLocalPersistence);

isAuthenticated.subscribe(value => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', value.toString());
    }
});

onAuthStateChanged(auth, (user) => {
    const authState = !!user;
    isAuthenticated.set(authState);
});

export async function login(username: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, username, password);
        isAuthenticated.set(true);
    } catch (error) {
        console.error('Firebase auth error:', error);
        throw new Error('Invalid credentials');
    }
}

export async function logout() {
    await auth.signOut();
    isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
}
