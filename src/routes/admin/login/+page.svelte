<script lang="ts">
    import { login } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '$lib/firebase/config';

    let username = '';
    let password = '';
    let error = '';
    let isLoading = false;

    async function handleLogin() {
        try {
            isLoading = true;
            // Sign in to Firebase Auth
            await signInWithEmailAndPassword(auth, username, password);
            
            // Perform any additional admin-specific operations here
            await login(username, password); // Assuming login handles admin-specific logic

            // Redirect to admin dashboard or desired page
            goto('/admin/');
        } catch (err) {
            error = err instanceof Error ? err.message : 'Invalid credentials';
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="min-h-screen flex justify-center bg-neutral-50 dark:bg-neutral-900 py-4 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div class="flex justify-center items-center">
            <h2 class="mt-6 text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
                Admin Login
            </h2>
        </div>
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
            {#if error}
                <div class="text-red-600 dark:text-red-400 text-center">{error}</div>
            {/if}
            
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="username" class="sr-only">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        bind:value={username}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                        placeholder="Username"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        bind:value={password}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div class="flex justify-center flex-col items-center gap-4">
                {#if isLoading}
                    <div class="flex items-center gap-2">
                        <svg class="animate-spin h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-black dark:text-white">Signing in...</span>
                    </div>
                {:else}
                    <button
                        type="submit"
                        class="group relative flex justify-center py-2 px-4 border border-black dark:border-white text-sm font-medium rounded-md text-black dark:text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-neutral-900"
                    >
                        Sign in
                    </button>
                {/if}
            </div>
        </form>
    </div>
</div>