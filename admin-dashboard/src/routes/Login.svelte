<script lang="ts">
    import { login, resetPassword } from '$lib/stores/auth';
    import { navigate } from '$lib/router';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { auth } from '$lib/firebase/config';

    let username = $state('');
    let password = $state('');
    let error = $state('');
    let successMessage = $state('');
    let isLoading = $state(false);
    let isResettingPassword = $state(false);

    async function handleLogin() {
        try {
            isLoading = true;
            await signInWithEmailAndPassword(auth, username, password);
            await login(username, password);
            navigate('/');
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

<div class="min-h-screen flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500">
    <div class="glass-card w-full max-w-md p-10 border-neutral-200 dark:border-white/5 relative overflow-hidden">
        
        <div class="text-center mb-10">
            <div class="w-16 h-16 bg-neutral-900 dark:bg-white rounded-[1.5rem] mx-auto flex items-center justify-center mb-6 shadow-2xl">
                <span class="text-white dark:text-black font-black text-2xl tracking-tighter">S4</span>
            </div>
            <h2 class="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">Admin</h2>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium">System Authentication Required</p>
        </div>

        <form class="space-y-6" onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {#if error}
                <div class="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold p-4 rounded-2xl text-center backdrop-blur-md uppercase tracking-widest">
                    {error}
                </div>
            {/if}
            {#if successMessage}
                <div class="bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold p-4 rounded-2xl text-center backdrop-blur-md uppercase tracking-widest">
                    {successMessage}
                </div>
            {/if}
            
            <div class="space-y-4">
                <div class="group">
                    <label for="username" class="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Identity</label>
                    <input
                        id="username"
                        name="username"
                        type="email"
                        required
                        bind:value={username}
                        autocomplete="email"
                        class="glass-input w-full"
                        placeholder="admin@mail.com"
                    />
                </div>
                {#if !isResettingPassword}
                    <div class="group">
                        <label for="password" class="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Access Key</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            bind:value={password}
                            autocomplete="current-password"
                            class="glass-input w-full"
                            placeholder="••••••••"
                        />
                    </div>
                {/if}
            </div>

            <div class="pt-4 flex flex-col gap-4">
                {#if isLoading}
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button disabled class="w-full glass-button opacity-50 cursor-wait">
                        <i class="fas fa-circle-notch animate-spin"></i>
                    </button>
                {:else}
                    {#if isResettingPassword}
                        <button type="button" onclick={handleResetPassword} class="w-full glass-button glass-button-primary">
                            Authorize Reset
                        </button>
                        <button type="button" onclick={() => { isResettingPassword = false; error = ''; successMessage = ''; }} class="w-full text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest transition-all">
                            Back to Access
                        </button>
                    {:else}
                        <button type="submit" class="w-full glass-button glass-button-primary">
                            Gain Access
                        </button>
                        <button type="button" onclick={() => { isResettingPassword = true; error = ''; successMessage = ''; }} class="w-full text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest transition-all">
                            Lost Access Key?
                        </button>
                    {/if}
                {/if}
            </div>
        </form>
    </div>
</div>
