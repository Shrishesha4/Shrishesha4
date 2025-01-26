<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import axios from 'axios';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let repos: any[] = [];
    let loading = true;
    let error = '';
    let isMobile = false;
    let currentIndex = 0;
    let startX: number;
    let deltaX = spring(0);

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        loadRepositories();

        // Return the cleanup function directly
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    });

    // Separate the repository loading logic
    async function loadRepositories() {
        try {
            const response = await axios.get('https://api.github.com/users/shrishesha4/repos');
            repos = response.data.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
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
    }

    function handleTouchMove(e: TouchEvent) {
        if (!isMobile || startX === undefined) return;
        const currentX = e.touches[0].clientX;
        deltaX.set(currentX - startX);
    }

    function handleTouchEnd() {
        if (!isMobile || startX === undefined) return;
        if ($deltaX < -100 && currentIndex < repos.length - 1) {
            currentIndex++;
        } else if ($deltaX > 100 && currentIndex > 0) {
            currentIndex--;
        }
        deltaX.set(0);
        startX = 0;
    }
</script>
{#if loading}
    <LoadingSpinner />
{:else}
    <h2 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 py-1 mt-6">GitHub Repositories</h2>
    <section class="py-2 ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
            {#if loading}
                <div class="flex justify-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
                </div>
            {:else if error}
                <div class="text-red-500 text-center">{error}</div>
            {:else}
                {#if isMobile}
                    <div 
                        class="h-[60vh] w-full flex flex-col items-center justify-center overflow-hidden relative"
                        on:touchstart={handleTouchStart}
                        on:touchmove={handleTouchMove}
                        on:touchend={handleTouchEnd}
                    >
                        {#if repos[currentIndex]}
                            <div 
                                class="w-full h-[500px] bg-neutral-200 dark:bg-neutral-700 rounded-xl shadow-lg transition-transform"
                                style="transform: translateX({$deltaX}px) rotate({$deltaX * 0.1}deg)"
                            >
                                <div class="p-6">
                                    <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                        {repos[currentIndex].name}
                                    </h3>
                                    <p class="text-neutral-600 dark:text-neutral-300 mb-4">
                                        {repos[currentIndex].description || 'No description available'}
                                    </p>
                                    <div class="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                                        {#if repos[currentIndex].language}
                                            <span class="flex items-center">
                                                <span class="w-3 h-3 rounded-full bg-primary-500 mr-2"></span>
                                                {repos[currentIndex].language}
                                            </span>
                                        {/if}
                                        <span>⭐ {repos[currentIndex].stargazers_count}</span>
                                        <span>🍴 {repos[currentIndex].forks_count}</span>
                                    </div>
                                    <a
                                        href={repos[currentIndex].html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="w-full block text-center px-4 py-2 bg-neutral-800 dark:bg-neutral-600 text-white rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-500 transition-colors duration-200"
                                    >
                                        View Repository
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Page Indicator -->
                            <div class="flex gap-2 mt-6">
                                {#each repos as _, i}
                                    <div 
                                        class="w-2 h-2 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-white w-4' : 'bg-neutral-300 dark:bg-neutral-600'}"
                                    ></div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {:else}
                    <div class="bg-white/80 dark:bg-neutral-700/80 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-neutral-600/20">
                        <!-- Enhanced Finder-like header -->
                        <div class="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-3 flex items-center space-x-3 border-b border-neutral-200 dark:border-neutral-600">
                            <div class="flex space-x-2">
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-150"></button>
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-150"></button>
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-150"></button>
                            </div>
                        </div>
                        
                        <!-- Enhanced Finder-like content -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-neutral-50/50 dark:bg-neutral-800/50">
                            {#each repos as repo}
                                <div class="group bg-white/90 dark:bg-neutral-700/90 backdrop-blur-sm rounded-lg p-4 hover:bg-white dark:hover:bg-neutral-600 transition-all duration-200 border border-neutral-200/50 dark:border-neutral-600/50 hover:shadow-md">
                                    <div class="flex items-start space-x-3">
                                        <div class="flex-shrink-0">
                                            <svg class="w-10 h-10 text-neutral-400 group-hover:text-primary-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V19a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <h3 class="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate group-hover:text-primary-500 transition-colors duration-200">
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
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mt-3 text-xs text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center"
                                    >
                                        View Repository 
                                        <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
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