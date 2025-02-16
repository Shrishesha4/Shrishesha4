<script lang='ts'>
    import { profile, techMap } from '$lib/stores/profile';
    import { loading } from '$lib/stores/loading';
    import { onMount, onDestroy } from 'svelte';
    
    let isLoading = true;

    function getTechIcon(tech: string): string {
        const key = tech.toLowerCase().trim();
        return techMap[key] || techMap[key.replace(/[^a-z0-9]/g, '')] || techMap.default;

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
        <h1 class="mb-6 font-bold text-neutral-900 dark:text-neutral-100 flex flex-col">
            <!-- <span class="text-3xl mb-2">Hi, I'm</span> -->
            <span class="text-6xl">{$profile.name || ''}</span>
        </h1>
        <!-- Social Links for Desktop -->
        <div class="hidden md:flex flex-row gap-8 mr-20 mt-5">
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
    <p class="mb-8 p-2 text-lg text-neutral-600 dark:text-neutral-400">
        {$profile.location || ''}
    </p>
    <div class="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
        <div class="flex flex-wrap gap-6 items-center">
            {#each $profile.techStack as tech}
                <div class="flex items-center justify-center p-2 glass-button rounded-lg hover:scale-110 transition-all duration-200">
                    <i class={getTechIcon(tech)} style="font-size: 2.5em;"></i>

                </div>
            {/each}
        </div>
    </div>
    <div class="flex gap-4">
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
    {:else}
    <div class="animate-pulse">
        <!-- skeleton loading UI -->
    </div>
    {/if}
</div>