<script lang="ts">
    import { onMount } from 'svelte';
    import { contactConfig } from '$lib/stores/contact';
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
            await contactConfig.load();
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
        
            // Then send to Google Spreadsheet
            if ($contactConfig.spreadsheetUrl) {
                // Create a form and submit it programmatically
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = $contactConfig.spreadsheetUrl;
                form.target = '_blank';
        
                // Change variable name to avoid conflict
                const submissionData = {
                    ...formData,
                    timestamp: new Date().toISOString()
                };
        
                // Use the renamed variable
                Object.entries(submissionData).forEach(([key, value]) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    form.appendChild(input);
                });
        
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
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

<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">Contact Me</h1>
        
        {#if loading}
            <div class="flex justify-center">
                <LoadingSpinner />
            </div>
        {:else}
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Contact Form -->
                <div class="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Send a Message</h2>
                    
                    {#if error}
                        <div class="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    {/if}

                    {#if success}
                        <div class="bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 p-3 rounded-lg mb-4">
                            Message sent successfully!
                        </div>
                    {/if}

                    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                bind:value={formData.name}
                                required
                                class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                bind:value={formData.email}
                                required
                                class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label for="subject" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                bind:value={formData.subject}
                                required
                                class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label for="message" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Message</label>
                            <textarea
                                id="message"
                                bind:value={formData.message}
                                required
                                rows="4"
                                class="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            class="w-full px-6 py-3 bg-neutral-900 dark:bg-neutral-700 text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-600 transition-colors duration-200 disabled:opacity-50"
                        >
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                <!-- Contact Information -->
                <div class="space-y-6">
                    <div class="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Contact Information</h2>
                        <div class="space-y-4">
                            {#if $contactConfig.email}
                                <div class="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                    <i class="fa-regular fa-envelope text-xl"></i>
                                    <span>{$contactConfig.email}</span>
                                </div>
                            {/if}
                            
                            {#if $contactConfig.phone}
                                <div class="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                    <i class="fa-solid fa-phone text-xl"></i>
                                    <span>{$contactConfig.phone}</span>
                                </div>
                            {/if}
                            
                            {#if $contactConfig.location}
                                <div class="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                    <i class="fa-solid fa-location-dot text-xl"></i>
                                    <span>{$contactConfig.location}</span>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>