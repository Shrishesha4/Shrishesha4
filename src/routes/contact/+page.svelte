<script lang="ts">
    import { asClassComponent } from 'svelte/legacy';
    import { onMount, onDestroy } from 'svelte';
    import { contact } from '$lib/stores/contact';
    import { socialLinks } from '$lib/stores/socialLinks';
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
            await Promise.all([contact.load(), socialLinks.load()]);
            loading = false;
        } catch (err) {
            error = 'Failed to load contact information';
            loading = false;
        }
    });

    onDestroy(() => {
        contact.cleanup();
        socialLinks.cleanup();
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

{#if loading}
    <div class="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div class="flex flex-col items-center gap-4 animate-pulse">
            <LoadingSpinner />
            <p class="text-neutral-500 text-sm">Connecting...</p>
        </div>
    </div>
{:else}
    <div class="min-h-screen flex items-center justify-center p-4 bg-transparent selection:bg-primary-500 selection:text-white relative overflow-hidden">
        
        <!-- Background Decorative Blobs -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[128px] pointer-events-none animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none animate-pulse-slow" style="animation-delay: 2s;"></div>

        <!-- Main Card Container -->
        <div class="w-full max-w-5xl bg-white/10 dark:bg-neutral-950/15 backdrop-blur-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-slide-up-fade ring-1 ring-white/30 dark:ring-white/10 z-10">
            
            <!-- LEFT PANEL: Contact Info (Dark Themed) -->
            <div class="w-full md:w-5/12 bg-gradient-to-br from-neutral-900/40 to-neutral-800/40 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group backdrop-blur-lg">
                <!-- Decorative circle -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-500/30 transition-colors duration-700"></div>

                <div class="relative z-10">
                    <h1 class="text-4xl md:text-5xl font-bold mb-2 leading-tight">Let's<br>Connect.</h1>
                    <p class="text-neutral-400 text-lg mb-8">Have an idea? Let's build something amazing together.</p>
                    
                    <!-- Socials / Quick Actions -->
                    <div class="space-y-6">
                        {#if $contact.email}
                            <div class="flex items-start gap-4 group/item cursor-pointer transition-transform hover:-translate-x-1 w-full">
                                <div class="w-10 h-10 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-primary-400 group-hover/item:bg-primary-500 group-hover/item:text-white transition-colors">
                                    <i class="fa-regular fa-envelope"></i>
                                </div>
                                <a 
                                    href="mailto:{$contact.email}" 
                                    class="text-sm md:text-base text-neutral-200 group-hover/item:text-white underline-offset-4 hover:underline break-all whitespace-normal pt-2 flex-1"
                                >
                                    {$contact.email}
                                </a>
                            </div>
                        {/if}

                        {#if $contact.phone}
                            <div class="flex items-center gap-4 group/item cursor-pointer transition-transform hover:-translate-x-1">
                                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-purple-400 group-hover/item:bg-purple-500 group-hover/item:text-white transition-colors">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <a href="tel:{$contact.phone.replace(/\s+/g, '')}" class="text-sm md:text-base text-neutral-200 group-hover/item:text-white underline-offset-4 hover:underline">
                                    {$contact.phone}
                                </a>
                            </div>
                        {/if}

                        {#if $contact.location}
                            <div class="flex items-center gap-4 group/item cursor-pointer transition-transform hover:-translate-x-1">
                                <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-pink-400 group-hover/item:bg-pink-500 group-hover/item:text-white transition-colors">
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <a href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent($contact.location)}" target="_blank" class="text-sm md:text-base text-neutral-200 group-hover/item:text-white underline-offset-4 hover:underline">
                                    {$contact.location}
                                </a>
                            </div>
                        {/if}
                    </div>
                </div>

                <div class="relative z-10 mt-12">
                    <div class="flex items-center justify-between border-t border-white/10 pt-6">
                        <BuyMeCoffee mode="button" />
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                         <div class="flex gap-4">
                             {#each $socialLinks.links as link (link.id)}
                                 <a href={link.url} target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors" aria-label={link.label}>
                                     {#if link.icon.startsWith('http://') || link.icon.startsWith('https://')}
                                         <img src="{link.icon}" alt="{link.label}" class="w-5 h-5" />
                                     {:else}
                                         <i class="{link.icon} text-xl"></i>
                                     {/if}
                                 </a>
                             {/each}
                         </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT PANEL: Form (Light/Glass Themed) -->
            <div class="w-full md:w-7/12 p-8 md:p-12 bg-white/5 dark:bg-neutral-950/20 relative backdrop-blur-lg">
                
                <div class="mb-8">
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">Send a Message</h2>
                    <p class="text-neutral-500 dark:text-neutral-400 text-sm mt-2">I usually respond within 24 hours.</p>
                </div>

                <!-- Status Messages -->
                {#if error}
                    <div class="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 animate-slide-down">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                    </div>
                {/if}

                {#if success}
                    <div class="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30 animate-slide-down">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-check-circle"></i>
                            <span>Message sent successfully!</span>
                        </div>
                    </div>
                {/if}

                <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                    
                    <!-- Name & Email Row -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="relative group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                autocomplete="name"
                                bind:value={formData.name}
                                placeholder=" "
                                required
                                class="block w-full px-4 py-3 text-neutral-900 dark:text-white bg-white/50 dark:bg-neutral-700/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-500 peer transition-all duration-300"
                            />
                            <label 
                                for="name" 
                                class="absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 bg-transparent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary-500 pointer-events-none"
                            >
                                Your Name
                            </label>
                        </div>

                        <div class="relative group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autocomplete="email"
                                bind:value={formData.email}
                                placeholder=" "
                                required
                                class="block w-full px-4 py-3 text-neutral-900 dark:text-white bg-white/50 dark:bg-neutral-700/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-500 peer transition-all duration-300"
                            />
                            <label 
                                for="email" 
                                class="absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 bg-transparent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary-500 pointer-events-none"
                            >
                                Email Address
                            </label>
                        </div>
                    </div>

                    <!-- Subject -->
                    <div class="relative group">
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            autocomplete="off"
                            bind:value={formData.subject}
                            placeholder=" "
                            required
                            class="block w-full px-4 py-3 text-neutral-900 dark:text-white bg-white/50 dark:bg-neutral-700/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-500 peer transition-all duration-300"
                        />
                        <label 
                            for="subject" 
                            class="absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 bg-transparent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary-500 pointer-events-none"
                        >
                            Subject
                        </label>
                    </div>

                    <!-- Message -->
                    <div class="relative group">
                        <textarea
                            id="message"
                            name="message"
                            autocomplete="off"
                            bind:value={formData.message}
                            placeholder=" "
                            required
                            rows="5"
                            class="block w-full px-4 py-3 text-neutral-900 dark:text-white bg-white/50 dark:bg-neutral-700/50 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-primary-500 peer transition-all duration-300 resize-none"
                        ></textarea>
                        <label 
                            for="message" 
                            class="absolute text-sm text-neutral-500 dark:text-neutral-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 bg-transparent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary-500 pointer-events-none"
                        >
                            Write your message here...
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        disabled={sending}
                        class="group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span class="relative z-10 flex items-center gap-2">
                            {#if sending}
                                <i class="fas fa-circle-notch fa-spin"></i>
                                <span>Sending...</span>
                            {:else}
                                <span>Send Message</span>
                                <i class="fas fa-paper-plane transition-transform group-hover:translate-x-1"></i>
                            {/if}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
{/if}

<style>
    /* --- Animations --- */

    @keyframes slideUpFade {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulseSlow {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
    }

    .animate-slide-up-fade {
        animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .animate-slide-down {
        animation: slideDown 0.4s ease-out both;
    }

    .animate-pulse-slow {
        animation: pulseSlow 8s ease-in-out infinite;
    }

    /* Input Peer Styles for Floating Labels */
    input:focus ~ label,
    input:not(:placeholder-shown) ~ label,
    textarea:focus ~ label,
    textarea:not(:placeholder-shown) ~ label {
        /* Move labels higher and slightly smaller for clearer separation */
        transform: translateY(-2.5rem) scale(0.75);
        background-color: transparent; /* ensure no solid background shows through */
        padding: 0 0.4rem; /* small horizontal padding to avoid overlap artifacts */
    }

    /* Dark mode: keep labels transparent as well */
    @media (prefers-color-scheme: dark) {
        input:focus ~ label,
        input:not(:placeholder-shown) ~ label,
        textarea:focus ~ label,
        textarea:not(:placeholder-shown) ~ label {
            transform: translateY(-1.1rem) scale(0.75);
            background-color: transparent;
        }
    }
</style>