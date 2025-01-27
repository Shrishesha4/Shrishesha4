<script lang="ts">
    import { onMount } from 'svelte';
    import { contact } from '$lib/stores/contact';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { db } from '$lib/firebase/config';
    import { collection, addDoc } from 'firebase/firestore';

    let formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };
    let loading = true;
    let sending = false;
    let error = '';
    let success = false;

    onMount(async () => {
        try {
            await contact.load();
            loading = false;
        } catch (err) {
            error = 'Failed to load contact information';
            loading = false;
        }
    });

    async function handleSubmit() {
        sending = true;
        success = false;
        error = '';
        
        try {
            // Save to Firestore first
            await addDoc(collection(db, 'messages'), {
                ...formData,
                timestamp: new Date(),
                read: false
            });
        
            // Modified Google Spreadsheet submission for better mobile compatibility
            if ($contact.spreadsheetUrl) {
                try {
                    const response = await fetch($contact.spreadsheetUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            ...formData,
                            timestamp: new Date().toISOString()
                        }).toString()
                    });
                    
                    if (!response.ok && response.type !== 'opaque') {
                        throw new Error('Failed to submit to spreadsheet');
                    }
                } catch (err) {
                    console.warn('Spreadsheet submission error:', err);
                    // Continue execution even if spreadsheet submission fails
                }
            }
            
            success = true;
            formData = { name: '', email: '', subject: '', message: '' };
        } catch (err) {
            console.error('Error sending message:', err);
            error = 'Failed to send message. Please try again.';
        } finally {
            sending = false;
        }
    }
</script>

<div class="min-h-screen p-4 pb-24"> <!-- Increased padding-top for better navbar clearance -->
    <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">Contact Me</h1>
        
        {#if loading}
            <div class="flex justify-center">
                <LoadingSpinner />
            </div>
        {:else}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"> <!-- Reduced gap on mobile -->
                <!-- Contact Form -->
                <div class="bg-neutral-200 dark:bg-neutral-900 p-3 sm:p-6 rounded-2xl shadow-2xl"> <!-- Reduced padding on mobile -->
                    <div class="flex justify-center">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">Send a Message</h2>
                    </div>
                    
                    {#if error}
                        <div class="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    {/if}

                    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> <!-- Added grid for name and email -->
                            <div>
                                <label for="name" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    bind:value={formData.name}
                                    required
                                    class="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    bind:value={formData.email}
                                    required
                                    class="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label for="subject" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                bind:value={formData.subject}
                                required
                                class="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label for="message" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Message</label>
                            <textarea
                                id="message"
                                bind:value={formData.message}
                                required
                                rows="4"
                                class="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                            ></textarea>
                        </div>
                        <div class="flex justify-center">
                            <button
                                type="submit"
                                disabled={sending}
                                class="px-4 py-2 border border-neutral-900 dark:border-neutral-700 text-black dark:text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-600 transition-colors duration-200 disabled:opacity-50"
                            >
                                {sending ? 'Sending...' : ''}
                                <i class="fa fa-paper-plane px-2" aria-hidden="true"></i>
                            </button>
                        </div>
                    </form>

                    {#if success}
                        <div class="mt-6 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 p-3 rounded-lg">
                            Message sent successfully!
                        </div>
                    {/if}
                </div>

                <!-- Contact Information -->
                <div class="space-y-4"> <!-- Reduced vertical spacing -->
                    <div class="bg-neutral-200 dark:bg-neutral-900 p-3 sm:p-6 rounded-2xl shadow-2xl">
                        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Contact Info</h2>
                        <div class="space-y-4">
                            {#if $contact.email}
                                <div class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                                    <i class="fa-regular fa-envelope text-lg sm:text-xl"></i>
                                    <span class="text-sm sm:text-base break-all">{$contact.email}</span>
                                </div>
                            {/if}
                            
                            {#if $contact.phone}
                                <div class="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                    <i class="fa-solid fa-phone text-xl"></i>
                                    <span>{$contact.phone}</span>
                                </div>
                            {/if}
                            
                            {#if $contact.location}
                                <div class="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                    <i class="fa-solid fa-location-dot text-xl"></i>
                                    <span>{$contact.location}</span>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>