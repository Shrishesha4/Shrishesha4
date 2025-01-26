<script lang="ts">
    import { contactConfig, type ContactConfig } from '$lib/stores/contact';
    import { toast } from '$lib/stores/toast';
    import { onMount } from 'svelte';

    let currentConfig: ContactConfig = {
        spreadsheetUrl: '',
        email: '',
        phone: '',
        location: ''
    };
    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            await contactConfig.load();
            currentConfig = { ...$contactConfig };
            loading = false;
        } catch (err) {
            error = 'Failed to load contact configuration';
            loading = false;
        }
    });

    async function saveConfig() {
        try {
            await contactConfig.set(currentConfig);
            toast.show('Contact information updated successfully!', 'success');
        } catch (error) {
            toast.show('Failed to update contact information', 'error');
        }
    }
</script>
<!-- svelte-ignore a11y_label_has_associated_control -->
<div class="min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
        <!-- <h1 class="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Edit Contact Information</h1> -->
        
        {#if loading}
            <div class="flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
            </div>
        {:else if error}
            <div class="text-red-500 text-center p-4">{error}</div>
        {:else}
            <form class="space-y-6" on:submit|preventDefault={saveConfig}>
                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Google Spreadsheet URL</label>
                    <input 
                        type="url" 
                        bind:value={currentConfig.spreadsheetUrl}
                        required
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Email</label>
                    <input 
                        type="email" 
                        bind:value={currentConfig.email}
                        required
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Phone (optional)</label>
                    <input 
                        type="tel" 
                        bind:value={currentConfig.phone}
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <div>
                    <label class="block mb-2 text-neutral-700 dark:text-neutral-300">Location (optional)</label>
                    <input 
                        type="text" 
                        bind:value={currentConfig.location}
                        class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <div class="flex justify-end">
                    <button 
                        type="submit"
                        class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 transition-colors duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        {/if}
    </div>
</div>