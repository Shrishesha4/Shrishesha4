<script lang='ts'>
    import { profile, techMap } from '$lib/stores/profile';
    import { loading } from '$lib/stores/loading';
    import { onMount, onDestroy } from 'svelte';
    
    let isLoading = true;
    let showBadgeModal = false;
    let selectedBadgeIndex = 0;

    function getTechIcon(tech: string): string {
        const key = tech.toLowerCase().trim();
        return techMap[key] || techMap[key.replace(/[^a-z0-9]/g, '')] || techMap.default;
    }

    function isImageUrl(iconValue: string): boolean {
        return iconValue.startsWith('http://') || iconValue.startsWith('https://');
    }

    function openBadgeModal(index: number) {
        selectedBadgeIndex = index;
        showBadgeModal = true;
    }

    function closeBadgeModal() {
        showBadgeModal = false;
    }

    function nextBadge() {
        if ($profile.badges) {
            selectedBadgeIndex = (selectedBadgeIndex + 1) % $profile.badges.length;
        }
    }

    function prevBadge() {
        if ($profile.badges) {
            selectedBadgeIndex = (selectedBadgeIndex - 1 + $profile.badges.length) % $profile.badges.length;
        }
    }

    onMount(async () => {
        loading.show();
        isLoading = true;
        try {
            await profile.load();
        } finally {
            isLoading = false;
        }
        loading.hide();
    });

    onDestroy(() => {
        profile.cleanup();
    });
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<div>
    {#if !isLoading}
        <!-- Top Row: Name, Badges, Socials -->
        <div class="flex items-center justify-between">
            <div class="relative flex items-start">
                <h1 class="mb-6 font-bold text-neutral-900 dark:text-neutral-100 flex flex-col relative z-10 animate-fade-in-up" style="animation-delay: 0ms;">
                    <span class="text-6xl" style="text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6);">{$profile.name || ''}</span>
                </h1>
                
                <!-- Certification Badges (Dynamic - Fanned Card Deck Style) -->
                {#if $profile.badges && $profile.badges.length > 0}
                    <div class="flex absolute -left-6 -top-14 md:-top-20 z-0 animate-fade-in-scale" style="width: 240px; height: 200px; animation-delay: 100ms;">
                        {#each $profile.badges as badge, i}
                            {@const totalBadges = $profile.badges.length}
                            {@const rotationStep = 40}
                            {@const startRotation = -((totalBadges - 0.1) * rotationStep) / 2}
                            {@const rotation = startRotation + (i * rotationStep)}
                            {@const yOffset = Math.abs(rotation) * 0.2}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                            <img 
                                src={badge.imageUrl} 
                                alt={badge.title}
                                on:click={() => openBadgeModal(i)}
                                class="absolute w-16 h-16 md:w-28 md:h-28 object-contain hover:scale-125 transition-all duration-300 shadow-xl cursor-pointer border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 rounded-md backdrop-blur-sm"
                                style="
                                    left: {i * 15}px;
                                    top: {yOffset}px;
                                    transform: rotate({rotation}deg);
                                    transform-origin: bottom center;
                                    animation-delay: {150 + (i * 50)}ms;
                                "
                                title={badge.title}
                            />
                        {/each}
                    </div>
                {/if}
            </div>
            
            <!-- Social Links for Desktop -->
            <div class="hidden md:flex flex-row gap-8 mr-20 mb-3">
                {#each ['github', 'linkedin', 'x-twitter', 'envelope'] as social, i}
                    {@const href = social === 'github' ? 'https://github.com/shrishesha4' : 
                         social === 'linkedin' ? 'https://linkedin.com/in/shrishesha' : 
                         social === 'x-twitter' ? 'https://x.com/Shrishesha4' : 
                         'mailto:shrisheshanarmatesshvara@gmail.com'}
                    {@const iconPrefix = social === 'envelope' ? 'fas' : 'fa-brands'}
                    {@const iconName = social === 'envelope' ? 'envelope' : social === 'x-twitter' ? 'x' : social}
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 animate-pop-in hover:scale-110"
                        style="animation-delay: {200 + (i * 50)}ms;"
                        aria-label={social}
                    >
                        <i class="{iconPrefix} fa-{iconName} text-2xl"></i>
                    </a>
                {/each}
            </div>
        </div>

        <!-- Sub-titles -->
        <div class="mb-4 ml-2 text-lg text-neutral-700 dark:text-neutral-300">
            {#each $profile.sub_title as st, i}
                <h2 class="animate-slide-in-right" style="animation-delay: {400 + (i * 100)}ms;">
                    {st}
                </h2>
            {/each}
        </div>

        <!-- Location -->
        <p class="mb-5 p-2 text-lg text-neutral-600 dark:text-neutral-400 animate-fade-in-up" style="animation-delay: 600ms;">
            <i class="fas fa-map-marker-alt mr-2 text-primary-500"></i>{$profile.location || ''}
        </p>

        <!-- Buttons -->
        <div class="flex gap-3 md:gap-2 mb-8 justify-center md:justify-start">
            {#each ['Know Me', 'Contact Me', 'Schedule a Call'] as btn, i}
                {@const href = i === 0 ? '/aboutme' : i === 1 ? '/contact' : 'https://cal.com/shrishesha-n'}
                {@const primary = i === 0}
                <a
                    href={href}
                    class="glass-card-hover inline-flex items-center rounded-xl md:rounded-3xl border {primary ? 'border-neutral-300 dark:border-neutral-700' : 'border-neutral-300 dark:border-neutral-700'} {primary ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'} transition px-3 md:px-6 py-2 md:py-3 text-xs md:text-base hover:scale-105 animate-pop-in"
                    style="animation-delay: {700 + (i * 100)}ms;"
                >
                    {btn}
                </a>
            {/each}
        </div>

        <!-- Tech Stack -->
        <div class="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
            <div class="grid grid-cols-4 md:flex md:flex-wrap gap-4 md:gap-6 items-center justify-center md:justify-start">
                {#each $profile.techStack as tech, i}
                    {@const iconValue = getTechIcon(tech)}
                    <div 
                        class="tech-icon-wrapper relative flex items-center justify-center p-2 glass-button rounded-lg hover:scale-110 transition-all duration-200 group"
                        title={tech}
                        style="animation-delay: {1000 + (i * 30)}ms;"
                    >
                        {#if isImageUrl(iconValue)}
                            <img src={iconValue} alt={tech} class="w-10 h-10 object-contain" />
                        {:else}
                            <i class={iconValue} style="font-size: 2.5em;"></i>
                        {/if}
                        <!-- Tooltip -->
                        <div class="absolute bottom-full mb-2 hidden group-hover:block bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 py-1 rounded whitespace-nowrap z-10 animate-fade-in-up pointer-events-none">
                            {tech}
                            <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100"></div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <!-- Polished Skeleton Loader -->
        <div class="flex flex-col animate-pulse">
            <div class="flex items-center justify-between mb-6">
                <div class="h-16 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                <div class="hidden md:flex gap-4">
                    <div class="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
                    <div class="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
                    <div class="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800"></div>
                </div>
            </div>
            <div class="space-y-3">
                <div class="h-6 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                <div class="h-6 w-1/4 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            </div>
            <div class="flex gap-4 mt-8">
                <div class="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
                <div class="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
            </div>
            <div class="grid grid-cols-4 md:flex gap-4 mt-8">
                {#each Array(8) as _}
                    <div class="h-16 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<!-- Badge Modal -->
<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
{#if showBadgeModal && $profile.badges && $profile.badges.length > 0}
    <div 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in-overlay"
        on:click={closeBadgeModal}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Escape' && closeBadgeModal()}
    >
        <div 
            class="relative max-w-2xl w-full mx-4 glass-card p-8 rounded-2xl animate-modal-in"
            on:click|stopPropagation
            role="dialog"
            aria-modal="true"
        >
            <button 
                on:click={closeBadgeModal}
                class="absolute top-4 right-4 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
                <i class="fas fa-times"></i>
            </button>
            
            <div class="flex items-center justify-center mb-6 p-4">
                <img 
                    src={$profile.badges[selectedBadgeIndex].imageUrl}
                    alt={$profile.badges[selectedBadgeIndex].title}
                    class="max-w-full max-h-96 object-contain drop-shadow-2xl"
                />
            </div>
            
            <h3 class="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-4">
                {$profile.badges[selectedBadgeIndex].title}
            </h3>
            
            {#if $profile.badges.length > 1}
                <div class="flex justify-between items-center mt-6">
                    <button 
                        on:click={prevBadge}
                        class="glass-button px-4 py-2 rounded-lg hover:scale-110 transition-transform flex items-center gap-2"
                    >
                        <i class="fas fa-chevron-left"></i> Previous
                    </button>
                    
                    <div class="text-neutral-700 dark:text-neutral-300 font-mono">
                        {selectedBadgeIndex + 1} / {$profile.badges.length}
                    </div>
                    
                    <button 
                        on:click={nextBadge}
                        class="glass-button px-4 py-2 rounded-lg hover:scale-110 transition-transform flex items-center gap-2"
                    >
                        Next <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    /* Base Animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes popIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes modalIn {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes fadeInOverlay {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Utility Classes with 'both' to prevent blinking */
    .animate-fade-in-up {
        animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .animate-fade-in-scale {
        animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .animate-slide-in-right {
        animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .animate-pop-in {
        animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    .animate-modal-in {
        animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-fade-in-overlay {
        animation: fadeInOverlay 0.3s ease-out forwards;
    }

    /* Tech Stack Icon Wrapper */
    .tech-icon-wrapper {
        opacity: 0; /* Start hidden */
        animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
    }
</style>