import { writable } from 'svelte/store';
import { verifyPassword } from '$lib/utils/auth';

export const isAuthenticated = writable(false);

const STORED_HASH = '$2a$10$Ug7AA2Nh0.0QgVRYV.0BPO1iu9TshV4LizDrLscSRrkFoLVxQRFP.'; // actual hashed password
const VALID_USERNAME = 'admin@shesha.in';

export async function login(username: string, password: string) {
    if (username !== VALID_USERNAME) {
        throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(password, STORED_HASH);
    if (!isValid) {
        throw new Error('Invalid credentials');
    }

    isAuthenticated.set(true);
}

export function logout() {
    isAuthenticated.set(false);
}
