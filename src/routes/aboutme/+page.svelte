<script lang="ts">
    import BuyMeCoffee from '$lib/components/BuyMeCoffee.svelte';
    import { profile } from '$lib/stores/profile';
    import { onMount } from 'svelte';

    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            await profile.load();
        } catch (err) {
            console.error('Error loading profile:', err);
            error = 'Failed to load profile data';
        } finally {
            loading = false;
        }
    });
</script>

<!-- svelte-ignore a11y_img_redundant_alt -->
{#if loading}
    <div class="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div class="flex flex-col items-center gap-4 animate-pulse">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <p class="text-neutral-500 text-sm animate-pulse">Loading profile...</p>
        </div>
    </div>
{:else if error}
    <div class="flex justify-center items-center min-h-screen">
        <div class="p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl text-center border border-red-200 dark:border-red-800">
            <h3 class="text-xl font-bold text-red-600 mb-2">Oops!</h3>
            <p class="text-red-500">{error}</p>
        </div>
    </div>
{:else}
    <!-- Main Container -->
    <div class="min-h-screen relative w-full bg-transparent selection:text-white">
        
        <!-- Background Decorative Gradients -->
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10"></div>

        <div class="max-w-6xl mx-auto px-4 py-12 md:py-20">
            
            <!-- SECTION 1: HERO SPLIT -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
                
                <!-- Left Column: Profile & Actions -->
                <div class="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left relative">
                    <!-- Avatar with Decorative Rings -->
                    <div class="relative group animate-scale-in mb-8">
                        <div class="absolute inset-0 bg-gradient-to-tr from-primary-400 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                        <div class="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full scale-110 opacity-10 group-hover:scale-105 transition duration-700"></div>
                        <img 
                            src={$profile.profileImage}
                            alt="Profile Picture" 
                            class="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white dark:border-neutral-900 shadow-2xl z-10"
                        />
                    </div>

                    <h1 class="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2 animate-slide-up" style="animation-delay: 100ms;">
                        {$profile.name}
                    </h1>
                    <p class="text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium mb-8 animate-slide-up" style="animation-delay: 150ms;">
                        {$profile.title}
                    </p>

                    <!-- Action Buttons Group -->
                    <div class="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start animate-slide-up" style="animation-delay: 200ms;">
                        <a 
                            href="https://cal.com/shrishesha-n"
                            class="flex-1 group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            <i class="fas fa-calendar-alt transition-transform group-hover:rotate-12"></i>
                            <span>Schedule a Call</span>
                        </a>
                        
                        <!-- Buy Me Coffee Wrapper -->
                        <div class="flex items-center justify-center p-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                            <BuyMeCoffee mode='icon'/>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Bio & Skills -->
                <div class="md:col-span-7 flex flex-col justify-center animate-fade-in" style="animation-delay: 300ms;">
                    
                    <!-- Bio Card -->
                    <div class="glass-card p-8 rounded-3xl mb-8 relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-4 opacity-10">
                            <i class="fas fa-quote-right text-6xl text-primary-500"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                            <span class="w-1 h-8 bg-primary-500 rounded-full"></span>
                            About Me
                        </h2>
                        <p class="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
                            {$profile.bio}
                        </p>
                    </div>

                    <!-- Skills Cloud -->
                    <div>
                        <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                            <span class="w-1 h-8 bg-purple-500 rounded-full"></span>
                            Tech Stack
                        </h3>
                        <div class="flex flex-wrap gap-3">
                            {#each $profile.skills as skill, i}
                                <span class="animate-pop-in px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 cursor-default hover:-translate-y-1 shadow-sm" style="animation-delay: {400 + (i * 50)}ms;">
                                    {skill}
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 2: VERTICAL TIMELINE (Education) -->
            <div class="relative max-w-4xl mx-auto">
                <div class="text-center mb-16 animate-fade-in-up">
                    <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">Education Journey</h2>
                    <div class="h-1 w-20 bg-primary-500 mx-auto rounded-full"></div>
                </div>

                <div class="relative pl-8 md:pl-0 border-l-2 md:border-l-0 border-neutral-200 dark:border-neutral-800 ml-4 md:ml-0">
                    {#each $profile.education as edu, i}
                        <div class="relative md:grid md:grid-cols-2 gap-8 mb-12 last:mb-0 animate-slide-in-right" style="animation-delay: {600 + (i * 150)}ms;">
                            
                            <!-- Connector Line (Desktop) & Dot -->
                            <div class="hidden md:block absolute left-1/2 top-6 w-4 h-4 bg-white dark:bg-neutral-950 border-4 border-primary-500 rounded-full -ml-2 z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                            
                            <!-- Mobile Dot -->
                            <div class="md:hidden absolute -left-[41px] top-6 w-4 h-4 bg-neutral-100 dark:bg-neutral-900 border-4 border-primary-500 rounded-full z-10"></div>

                            <!-- Spacer for alternating layout (Right side) -->
                            {#if i % 2 === 1}
                                <div></div>
                            {/if}

                            <!-- Content Card -->
                            <div class="glass-card p-6 md:p-8 rounded-2xl relative group hover:border-primary-500/50 transition-colors duration-300">
                                <!-- Date Badge -->
                                <div class="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold text-sm mb-4 border border-primary-500/20">
                                    {edu.year}
                                </div>
                                
                                <h3 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {edu.degree}
                                </h3>
                                <p class="text-neutral-600 dark:text-neutral-400 font-medium mb-4 flex items-center gap-2">
                                    <i class="fas fa-university text-sm"></i>
                                    {edu.institution}
                                </p>
                                
                                <!-- Decorative Element -->
                                <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                                    <i class="fas fa-graduation-cap text-4xl text-neutral-900 dark:text-white"></i>
                                </div>
                            </div>

                            <!-- Spacer for alternating layout (Left side) -->
                            {#if i % 2 === 0}
                                <div></div>
                            {/if}

                        </div>
                    {/each}
                </div>
            </div>

        </div>
    </div>
{/if}

<style>
    /* --- Animations --- */

    /* Pop In for Avatar */
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    /* Fade In */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Fade In Up for Text */
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Slide In Right for Timeline */
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Pop In for Skills */
    @keyframes popIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Slow Pulse for background blob */
    @keyframes pulseSlow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
    }

    /* Animation Utilities */
    .animate-scale-in {
        animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .animate-fade-in {
        animation: fadeIn 1s ease-out both;
    }

    .animate-slide-up {
        animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .animate-slide-in-right {
        animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .animate-pop-in {
        animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    .animate-pulse-slow {
        animation: pulseSlow 8s ease-in-out infinite;
    }

    /* Glassmorphism Utility */
    .glass-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }

    /* Dark Mode overrides for Glassmorphism via Tailwind classes in HTML are usually enough, 
       but ensuring specific styling here if global CSS isn't handling it perfectly */
    @media (prefers-color-scheme: dark) {
        .glass-card {
            background: rgba(17, 24, 39, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
</style>