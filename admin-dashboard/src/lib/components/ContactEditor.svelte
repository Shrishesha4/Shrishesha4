<script lang="ts">
    import { contact } from '$lib/stores/contact';
    import type { ContactConfig } from '$lib/stores/contact';
    import { toast } from '$lib/stores/toast';
    import { onMount } from 'svelte';
    import { navigate } from '$lib/router';
    import { auth } from '$lib/firebase/config';

    let currentConfig: ContactConfig = {
        spreadsheetUrl: '',
        email: '',
        phone: '',
        location: ''
    };
    let loading = true;
    let error = '';

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    navigate('/login');
                    return;
                }
                await contact.load();
                currentConfig = { ...$contact };
                loading = false;
            } catch (err) {
                error = 'Failed to load contact configuration';
                loading = false;
            }
        });
    
        return () => unsubscribe();
    });

    async function saveConfig() {
        try {
            await contact.set(currentConfig);
            toast.show('Contact information updated successfully!', 'success');
        } catch (error) {
            toast.show('Failed to update contact information', 'error');
        }
    }
</script>
<!-- svelte-ignore a11y_label_has_associated_control -->
<div>
    {#if loading}
        <div class="flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
        </div>
    {:else if error}
        <div class="text-red-500 text-center p-4">{error}</div>
    {:else}
        <form class="space-y-6" onsubmit={(e) => { e.preventDefault(); saveConfig(); }}>
                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Google Apps Script Link</label>
                    <input 
                        type="url" 
                        bind:value={currentConfig.spreadsheetUrl}
                        required
                        class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        placeholder=""
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Email</label>
                    <input 
                        type="email" 
                        bind:value={currentConfig.email}
                        required
                        class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Phone (optional)</label>
                    <input 
                        type="tel" 
                        bind:value={currentConfig.phone}
                        class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Location (optional)</label>
                    <input 
                        type="text" 
                        bind:value={currentConfig.location}
                        class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div class="flex justify-center">
                    <button 
                        type="submit"
                        class="glass-button hover:scale-105 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
    {/if}
</div>