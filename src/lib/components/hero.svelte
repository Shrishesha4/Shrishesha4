<script lang='ts'>
    import { profile, techMap } from '$lib/stores/profile';
    import { loading } from '$lib/stores/loading';
    import { onMount, onDestroy } from 'svelte';
    
    let isLoading = true;

    function getTechIcon(tech: string): string {
        const key = tech.toLowerCase().trim();
        return techMap[key] || techMap[key.replace(/[^a-z0-9]/g, '')] || techMap.default;
    }

    function isImageUrl(iconValue: string): boolean {
        return iconValue.startsWith('http://') || iconValue.startsWith('https://');
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
    <div class="flex items-center justify-between">
        <div class="relative flex items-start">
            <h1 class="mb-6 font-bold text-neutral-900 dark:text-neutral-100 flex flex-col">
                <!-- <span class="text-3xl mb-2">Hi, I'm</span> -->
                <span class="text-6xl">{$profile.name || ''}</span>
            </h1>
            
            <!-- Certification Badges (Dynamic - Fanned Card Deck Style) -->
            {#if $profile.badges && $profile.badges.length > 0}
                <div class="hidden md:flex absolute -left-6 -top-20 z-10" style="width: 240px; height: 200px;">
                    {#each $profile.badges as badge, i}
                        {@const totalBadges = $profile.badges.length}
                        {@const rotationStep = 40}
                        {@const startRotation = -((totalBadges - 1) * rotationStep) / 2}
                        {@const rotation = startRotation + (i * rotationStep)}
                        {@const yOffset = Math.abs(rotation) * 0.2}
                        <img 
                            src={badge.imageUrl} 
                            alt={badge.title}
                            class="absolute w-20 h-20 object-contain hover:scale-125 hover:z-20 transition-all duration-300 shadow-lg"
                            style="
                                left: {i * 15}px;
                                top: {yOffset}px;
                                transform: rotate({rotation}deg);
                                transform-origin: bottom center;
                            "
                            title={badge.title}
                        />
                    {/each}
                </div>
            {/if}
        </div>
        <!-- Social Links for Desktop -->
        <div class="hidden md:flex flex-row gap-8 mr-20 mb-3">
            <a
                href="https://github.com/shrishesha4"
                target="_blank"
                rel="noopener noreferrer"
                class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
                <i class="fa-brands fa-github text-2xl"></i>
            </a>
            <a
                href="https://linkedin.com/in/shrishesha"
                target="_blank"
                rel="noopener noreferrer"
                class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
                <i class="fa-brands fa-linkedin text-2xl"></i>
            </a>
            <a
                href="https://x.com/Shrishesha4"
                target="_blank"
                rel="noopener noreferrer"
                class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
                <i class="fa-brands fa-x-twitter text-2xl"></i>
            </a>
            <a
                href="mailto:shrisheshanarmatesshvara@gmail.com"
                target="_blank"
                class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
                <i class="fa-regular fa-envelope text-2xl"></i>
            </a>
        </div>
    </div>
    <div class="mb-4 ml-2 text-lg text-neutral-700 dark:text-neutral-300">
        <!-- I'm <span class="font-comic text-red-600 dark:text-red-400"><Typinganimation /></span> -->
        {#each $profile.sub_title as st}
            <h2>
                {st}
            </h2>
        {/each}
    </div>
    <p class="mb-5 p-2 text-lg text-neutral-600 dark:text-neutral-400">
        {$profile.location || ''}
    </p>
    <div class="flex gap-4 mb-8 justify-center md:justify-start">
        <a
            href="/aboutme"
            class="glass-card-hover inline-flex items-center rounded-lg border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-white transition hover:bg-neutral-800"
        >
            Know Me
        </a>
        <a
            href="/contact"
            class="glass-card-hover inline-flex items-center rounded-lg border border-neutral-300 px-6 py-3 text-neutral-700 transition dark:border-neutral-700 dark:text-neutral-300"
        >
            Contact Me
        </a>
    </div>
    <div class="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
        <div class="grid grid-cols-4 md:flex md:flex-wrap gap-4 md:gap-6 items-center">
            {#each $profile.techStack as tech}
                {@const iconValue = getTechIcon(tech)}
                <div 
                    class="relative flex items-center justify-center p-2 glass-button rounded-lg hover:scale-110 transition-all duration-200 group"
                    title={tech}
                >
                    {#if isImageUrl(iconValue)}
                        <img src={iconValue} alt={tech} class="w-10 h-10 object-contain" />
                    {:else}
                        <i class={iconValue} style="font-size: 2.5em;"></i>
                    {/if}
                    <!-- Tooltip -->
                    <div class="absolute bottom-full mb-2 hidden group-hover:block bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        {tech}
                        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100"></div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    {:else}
    <div class="animate-pulse">
        <!-- skeleton loading UI -->
    </div>
    {/if}
</div>