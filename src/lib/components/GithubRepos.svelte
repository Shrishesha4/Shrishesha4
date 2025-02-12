<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import axios from 'axios';
    import { createEventDispatcher } from 'svelte';
    import { githubService } from '$lib/services/github';

    const dispatch = createEventDispatcher();

    let repos: any[] = [];
    let loading = true;
    let error = '';
    let isMobile = false;
    let currentIndex = 0;
    let startX: number;
    let deltaX = spring(0);
    let startY: number;
    let opacity = spring(1);
    let scale = spring(1);

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        loadRepositories();

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    });

    async function loadRepositories() {
        try {
            repos = await githubService.getRepositories();
            repos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            loading = false;
        } catch (err) {
            console.error('Error fetching repositories:', err);
            error = 'Failed to load repositories';
            loading = false;
            dispatch('error');
        }
    }

    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }

    function handleTouchStart(e: TouchEvent) {
        if (!isMobile) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        opacity.set(1);
        scale.set(1);
    }

    function handleTouchMove(e: TouchEvent) {
        if (!isMobile || startX === undefined) return;
        const currentX = e.touches[0].clientX;
        const distance = Math.abs(currentX - startX);
        deltaX.set(currentX - startX);
        opacity.set(1 - Math.min(distance / 800, 0.3));
        scale.set(1 - Math.min(distance / 2000, 0.05));
    }

    function handleTouchEnd() {
        if (!isMobile || startX === undefined) return;
        const threshold = 80;

        if ($deltaX < -threshold && currentIndex < repos.length - 1) {
            opacity.set(0.7);
            scale.set(0.95);
            deltaX.set(-window.innerWidth / 2);
            setTimeout(() => {
                currentIndex++;
                deltaX.set(0);
                opacity.set(1);
                scale.set(1);
            }, 150); 
        } else if ($deltaX > threshold && currentIndex > 0) {
            opacity.set(0.7);
            scale.set(0.95);
            deltaX.set(window.innerWidth / 2);
            setTimeout(() => {
                currentIndex--;
                deltaX.set(0);
                opacity.set(1);
                scale.set(1);
            }, 150);
        } else {
            deltaX.set(0);
            opacity.set(1);
            scale.set(1);
        }
        startX = 0;
    }
</script>
<!-- svelte-ignore a11y_consider_explicit_label -->
{#if loading}
    <LoadingSpinner />
{:else}
    <h2 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 py-1 mt-6">GitHub Repositories</h2>
    <section class="py-2 overflow-visible">
        <div class="w-[85vw] max-w-7xl mx-auto overflow-visible">  
            {#if loading}
                <div class="flex justify-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
                </div>
            {:else if error}
                <div class="text-red-500 text-center">{error}</div>
            {:else}
                {#if isMobile}
                    <div class="h-[40vh] w-[85vw] flex flex-col items-center justify-center relative overflow-visible"
                        on:touchstart|passive={handleTouchStart}
                        on:touchmove|passive={handleTouchMove}
                        on:touchend|passive={handleTouchEnd}
                    >
                        {#if repos[currentIndex]}
                            <div class="w-full h-[500px] glass-card glass-card-hover transition-transform"
                                style="transform: translateX({$deltaX}px) rotate({$deltaX * 0.1}deg)"
                            >
                                <div class="p-6">
                                    <h3 class="text-xl font-semibold text-white mb-2">
                                        {repos[currentIndex].name}
                                    </h3>
                                    <p class="text-neutral-200 mb-4">
                                        {repos[currentIndex].description || 'No description available'}
                                    </p>
                                    <div class="flex items-center gap-4 text-sm text-neutral-300 mb-4">
                                        {#if repos[currentIndex].language}
                                            <span class="flex items-center">
                                                <span class="w-3 h-3 rounded-full bg-primary-500 mr-2"></span>
                                                {repos[currentIndex].language}
                                            </span>
                                        {/if}
                                        <span>⭐ {repos[currentIndex].stargazers_count}</span>
                                        <span>🍴 {repos[currentIndex].forks_count}</span>
                                    </div>
                                    <a href={repos[currentIndex].html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="glass-button w-full block text-center px-4 py-2 text-white rounded-md transition-all duration-200"
                                    >
                                        <i class="fab fa-github mr-1"></i>
                                        View Repo
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Navigation and Page Indicator -->
                            <div class="flex items-center justify-center gap-4 mt-6">
                                <!-- Left Button -->
                                {#if currentIndex > 0}
                                    <button
                                        class="glass-button w-8 h-8 flex items-center justify-center hover:scale-105 rounded-full text-white transition-all duration-200"
                                        on:click={() => {
                                            opacity.set(0.7);
                                            scale.set(0.95);
                                            deltaX.set(window.innerWidth / 2);
                                            setTimeout(() => {
                                                currentIndex--;
                                                deltaX.set(0);
                                                opacity.set(1);
                                                scale.set(1);
                                            }, 150);
                                        }}
                                    >
                                        <i class="fas fa-chevron-left text-sm"></i>
                                    </button>
                                {/if}

                                <!-- Page Indicator -->
                                <div class="flex gap-2">
                                    {#each repos as _, i}
                                        <div 
                                            class="w-2 h-2 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-white w-4 border border-black dark:border-white' : 'bg-white dark:bg-neutral-700'}"
                                        ></div>
                                    {/each}
                                </div>

                                <!-- Right Button -->
                                {#if currentIndex < repos.length - 1}
                                    <button
                                        class="glass-button w-8 h-8 flex items-center justify-center hover:scale-105 dark:hover:scale-105 rounded-full text-black/90 dark:text-white transition-all duration-200"
                                        on:click={() => {
                                            opacity.set(0.7);
                                            scale.set(0.95);
                                            deltaX.set(-window.innerWidth / 2);
                                            setTimeout(() => {
                                                currentIndex++;
                                                deltaX.set(0);
                                                opacity.set(1);
                                                scale.set(1);
                                            }, 150);
                                        }}
                                    >
                                        <i class="fas fa-chevron-right text-sm"></i>
                                    </button>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {:else}
                    <div class="glass-card overflow-hidden">
                        <div class="bg-white/20 dark:bg-black/30 backdrop-blur-sm p-2 flex items-center">
                            <div class="flex space-x-2">
                                <button class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-150"></button>
                                <button class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-150"></button>
                                <button class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-150"></button>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-transparent">
                            {#each repos as repo}
                                <div class="glass-card glass-card-hover p-4">
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0">
                                            <i class="fas fa-file text-4xl text-black-400 group-hover:text-primary-500 transition-colors duration-200"></i>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <h3 class="text-m font-bold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-primary-500 transition-colors duration-200">
                                                {repo.name}
                                            </h3>
                                            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                                                {repo.description || 'No description available'}
                                            </p>
                                            <div class="flex items-center gap-3 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                                                {#if repo.language}
                                                    <span class="flex items-center">
                                                        <span class="w-2 h-2 rounded-full bg-primary-500 mr-1"></span>
                                                        {repo.language}
                                                    </span>
                                                {/if}
                                                <span class="flex items-center">⭐ {repo.stargazers_count}</span>
                                                <span class="flex items-center">🍴 {repo.forks_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="glass-button mt-3 rounded-md px-3 py-2.5 inline-flex items-center justify-center gap-2 text-xs text-white transition-all duration-200 hover:scale-105"
                                    >   
                                        <i class="fab fa-github"></i>
                                        <span>View</span>
                                        <i class="fas fa-arrow-right text-xs group-hover:text-white transition-colors duration-200"></i>
                                    </a>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    </section>
{/if}