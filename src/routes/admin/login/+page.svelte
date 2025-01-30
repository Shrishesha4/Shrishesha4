<script lang="ts">
    import { login, resetPassword } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '$lib/firebase/config';

    let username = '';
    let password = '';
    let error = '';
    let successMessage = '';
    let isLoading = false;
    let isResettingPassword = false;

    async function handleLogin() {
        try {
            isLoading = true;
            await signInWithEmailAndPassword(auth, username, password);
            await login(username, password);
            goto('/admin/');
        } catch (err) {
            error = err instanceof Error ? err.message : 'Invalid credentials';
        } finally {
            isLoading = false;
        }
    }

    async function handleResetPassword() {
        try {
            isLoading = true;
            error = '';
            await resetPassword(username);
            successMessage = 'Password reset email sent. Please check your inbox.';
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to send reset email';
            successMessage = '';
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="min-h-screen flex justify-center py-4 px-4 pb-32 md:pb-4 sm:px-6 lg:px-8"> 
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
            {#if successMessage}
                <div class="text-green-600 dark:text-green-400 text-center">{successMessage}</div>
            {/if}
            
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="username" class="sr-only">Email</label>
                    <input
                        id="username"
                        name="username"
                        type="email"
                        required
                        bind:value={username}
                        autocomplete="email"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                {#if !isResettingPassword}
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            bind:value={password}
                            autocomplete="current-password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 placeholder-neutral-500 dark:placeholder-neutral-400 text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                {/if}
            </div>

            <div class="flex flex-col items-center gap-4">
                {#if isLoading}
                    <div class="flex items-center gap-2">
                        <svg class="animate-spin h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-black dark:text-white">
                            {isResettingPassword ? 'Sending reset email...' : 'Signing in...'}
                        </span>
                    </div>
                {:else}
                    {#if isResettingPassword}
                        <button
                            type="button"
                            on:click={handleResetPassword}
                            class="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Send Reset Email
                        </button>
                        <button
                            type="button"
                            on:click={() => {
                                isResettingPassword = false;
                                error = '';
                                successMessage = '';
                            }}
                            class="text-sm text-primary-600 hover:text-primary-500"
                        >
                            Back to Login
                        </button>
                    {:else}
                        <button
                            type="submit"
                            class="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Sign in
                        </button>
                        <button
                            type="button"
                            on:click={() => {
                                isResettingPassword = true;
                                error = '';
                                successMessage = '';
                            }}
                            class="text-sm text-primary-600 hover:text-primary-500"
                        >
                            Forgot password?
                        </button>
                    {/if}
                {/if}
            </div>
        </form>
    </div>
</div>