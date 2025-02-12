<script lang="ts">
	import { asClassComponent } from 'svelte/legacy';
    import { onMount } from 'svelte';
    import { contact } from '$lib/stores/contact';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { db } from '$lib/firebase/config';
    import { collection, addDoc } from 'firebase/firestore';
	import BuyMeCoffee from '$lib/components/BuyMeCoffee.svelte';

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
            await addDoc(collection(db, 'messages'), {
                ...formData,
                timestamp: new Date(),
                read: false
            });
        
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

<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-4xl font-bold">Contact Me</h1>
            <BuyMeCoffee mode="button"/>
        </div>
        {#if loading}
            <div class="flex justify-center">
                <LoadingSpinner />
            </div>
        {:else}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Contact Form -->
                <div class="glass-card glass-card-hover p-6 backdrop-blur-lg">
                    <div class="flex justify-center">
                        <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Send a Message</h2>
                    </div>
                    
                    {#if error}
                        <div class="bg-red-500/10 backdrop-blur-sm text-red-600 dark:text-red-400 p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    {/if}

                    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    autocomplete="name"
                                    bind:value={formData.name}
                                    placeholder="Your name"
                                    required
                                    class="transition-all duration-200 hover:scale-105 w-full px-3 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            
                            <div>
                                <label for="email" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autocomplete="email"
                                    bind:value={formData.email}
                                    placeholder="Your email"
                                    required
                                    class="transition-all duration-200 hover:scale-105 w-full px-3 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label for="subject" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                autocomplete="off"
                                bind:value={formData.subject}
                                placeholder="Subject"
                                required
                                class="glass-card transition-all duration-200 hover:scale-105 w-full px-3 py-2 rounded-lg bg-gray-200/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label for="message" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                autocomplete="off"
                                bind:value={formData.message}
                                placeholder="Write your message here"
                                required
                                rows="4"
                                class="transition-all duration-200 hover:scale-105 w-full px-3 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                            ></textarea>
                        </div>
                        <div class="flex justify-center">
                            <button
                                type="submit"
                                disabled={sending}
                                class="glass-card-hover inline-flex items-center rounded-lg border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-white transition hover:bg-neutral-800 gap-2"
                            >
                                {sending ? 'Sending...' : 'Send'}
                                <i class="fa fa-paper-plane" aria-hidden="true"></i>
                            </button>
                        </div>
                    </form>

                    {#if success}
                        <div class="mt-6 bg-green-500/10 backdrop-blur-sm text-green-600 dark:text-green-400 p-3 rounded-lg">
                            Message sent successfully!
                        </div>
                    {/if}
                </div>

                <!-- Contact Information -->
                <div class="space-y-4">
                    <div class="glass-card glass-card-hover p-6 backdrop-blur-lg">
                        <h2 class="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white mb-4">Contact Info</h2>
                        <div class="space-y-4">
                            {#if $contact.email}
                                <div class="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
                                    <i class="fa-regular fa-envelope text-lg sm:text-xl"></i>
                                    <a href="mailto:{$contact.email}" target="_blank">
                                        <span class="text-sm sm:text-base break-all">{$contact.email}</span>
                                    </a>
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
                    
                    <!-- <div>
                        <BuyMeCoffee mode='minimal'/>
                    </div> -->
                </div>
            </div>
        {/if}
    </div>
</div>