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
