<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { githubService } from '$lib/services/github';
    import { browser } from '$app/environment';

    const dispatch = createEventDispatcher();
    
    export let searchQuery = '';
    export let selectedFilter = 'all';
    export let categorizeProject: (title: string, description: string, technologies: string[]) => string[];

    let repos: any[] = [];
    let loading = true;
    let error = '';
    let visibleCards: Set<number> = new Set();
    let observer: IntersectionObserver | null = null;

    onMount(() => {
        loadRepositories();

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    });

    function setupObserver() {
        if (observer) observer.disconnect();

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        visibleCards = new Set([...visibleCards, index]);
                        observer?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        setTimeout(() => {
            if (browser) {
                const cards = document.querySelectorAll('.repo-card');
                cards.forEach((card) => observer?.observe(card));
            }
        }, 200);
    }

    async function loadRepositories() {
        try {
            repos = await githubService.getRepositories();
            repos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            loading = false;
            setTimeout(() => setupObserver(), 200);
        } catch (err) {
            console.error('Error fetching repositories:', err);
            error = 'Failed to load repositories';
            loading = false;
            dispatch('error');
        }
    }

    // Filter repos based on search query and selected filter
    $: filteredRepos = repos.filter(repo => {
        // Search filter
        const matchesSearch = !searchQuery || 
            repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (repo.language && repo.language.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Category filter - use intelligent categorization
        const matchesFilter = selectedFilter === 'all' || 
            categorizeProject(repo.name, repo.description || '', repo.language ? [repo.language] : [])
                .includes(selectedFilter);
        
        return matchesSearch && matchesFilter;
    });
    
    // Re-trigger observer when filter changes (and filtered list is rendered)
    $: if (filteredRepos && browser) {
        setTimeout(() => {
            if (browser) {
                const cards = document.querySelectorAll('.repo-card');
                cards.forEach((card) => observer?.observe(card));
            }
        }, 100);
    }
</script>

{#if loading}
    <LoadingSpinner />
{:else}
    <h2 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 py-1 mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">GitHub Repositories</h2>
    <section class="py-2 overflow-visible">
        <div class="w-full overflow-visible">  
            {#if error}
                <div class="text-red-500 text-center">{error}</div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-fr">
                    {#each filteredRepos as repo, index}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div 
                                data-index={index}
                                class="repo-card group relative flex flex-col rounded-2xl backdrop-blur-sm bg-white/5 dark:bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                class:opacity-0={!visibleCards.has(index)}
                                class:animate-fade-in-up={visibleCards.has(index)}
                                style="animation-delay: {(index % 6) * 80}ms;"
                            >
                                <!-- Icon/Header Section -->
                                <div class="relative h-32 bg-gradient-to-br from-primary-500/20 to-primary-700/30 flex items-center justify-center overflow-hidden group-hover:from-primary-500/30 group-hover:to-primary-700/40 transition-colors duration-500">
                                    <i class="fab fa-github text-6xl text-white/30 group-hover:text-white/50 transition-all duration-500 group-hover:scale-110 transform"></i>
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    
                                    <!-- Overlay Action -->
                                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <a 
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="px-6 py-2 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 transition-transform hover:scale-105 shadow-lg"
                                        >
                                            View Repository
                                        </a>
                                    </div>
                                </div>

                                <!-- Content -->
                                <div class="p-5 flex flex-col flex-1">
                                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 truncate">
                                        {repo.name}
                                    </h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed flex-1">
                                        {repo.description || 'No description available'}
                                    </p>

                                    <!-- Stats -->
                                    <div class="flex flex-wrap gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-500 mt-auto pt-4 border-t border-neutral-200/10 dark:border-white/5">
                                        {#if repo.language}
                                            <span class="flex items-center gap-1.5">
                                                <span class="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
                                                {repo.language}
                                            </span>
                                        {/if}
                                        <span class="flex items-center gap-1.5 hover:text-yellow-500 transition-colors">
                                            <i class="fas fa-star"></i> {repo.stargazers_count}
                                        </span>
                                        <span class="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                            <i class="fas fa-code-branch"></i> {repo.forks_count}
                                        </span>
                                    </div>
                                </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </section>
{/if}

<style>
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .animate-fade-in-up {
        /* Changed forwards to both to apply the 'from' state immediately upon class addition, preventing the blink */
        animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
        /* Prevent CSS transitions from interfering with the animation to avoid blinking */
        transition: none !important;
        backface-visibility: hidden;
        -webkit-font-smoothing: antialiased;
        will-change: transform, opacity;
    }

    .repo-card {
        position: relative;
        will-change: transform, opacity;
        /* Ensure initial transition does not cause a flash */
        transition: none;
    }

    .repo-card.opacity-0 {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: none !important;
    }
</style>