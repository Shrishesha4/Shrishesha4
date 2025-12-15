<script lang="ts">
    import { onMount } from 'svelte';
    import { githubService } from '$lib/services/github';
    import LoadingSpinner from './LoadingSpinner.svelte';
    
    let repos: any[] = [];
    let error: string = '';
    let loading = true;
    let isMobile = false;
    let visibleCards: Set<number> = new Set();
    let observer: IntersectionObserver | null = null;
    let activeCard: number | null = null;

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Call async function without blocking cleanup
        loadRepositories();
        
        return () => {
            if (observer) {
                observer.disconnect();
            }
            window.removeEventListener('resize', checkMobile);
        };
    });

    function setupScrollObserver() {
        if (!isMobile && repos.length > 0) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const index = parseInt(entry.target.getAttribute('data-index') || '0');
                            visibleCards = new Set([...visibleCards, index]);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
            );

            setTimeout(() => {
                const cards = document.querySelectorAll('.featured-repo-card');
                cards.forEach((card) => observer?.observe(card));
            }, 200);
        }
    }

    $: if (repos.length > 0 && isMobile) {
        const allIndices = Array.from({ length: Math.min(repos.length, 4) }, (_, i) => i);
        visibleCards = new Set(allIndices);
    }

    async function loadRepositories() {
        try {
            repos = await githubService.getRepositories();
            repos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            loading = false;
            setTimeout(() => setupScrollObserver(), 200);
        } catch (err) {
            console.error('Error fetching repositories:', err);
            error = 'Failed to load repositories';
            loading = false;
        }
    }

    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }

    function toggleModal(index: number) {
        activeCard = activeCard === index ? null : index;
    }
</script>

{#if !error}
    <div>
        <h2 class="mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100">Featured Repositories</h2>
        {#if loading}
            <div class="flex justify-center">
                <LoadingSpinner />
            </div>
        {:else if repos.length > 0}
            <div class="space-y-8">
                {#each repos.slice(0, 4) as repo, index}
                    <div 
                        data-index={index}
                        on:click={() => toggleModal(index)}
                        on:keydown={(e) => e.key === 'Enter' && toggleModal(index)}
                        role="button"
                        tabindex="0"
                        class="featured-repo-card group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row {index % 2 === 1 ? 'md:flex-row-reverse' : ''} cursor-pointer"
                        class:opacity-0={!isMobile && !visibleCards.has(index)}
                        class:animate-slide-in-left={!isMobile && visibleCards.has(index) && index % 2 === 0}
                        class:animate-slide-in-right={!isMobile && visibleCards.has(index) && index % 2 === 1}
                    >
                        <div class="relative w-full md:w-1/2 h-64 md:h-96 bg-gradient-to-br from-primary-500/20 to-primary-700/30 flex items-center justify-center overflow-hidden">
                            <i class="fab fa-github text-9xl text-white/30 group-hover:text-white/50 transition-all duration-500 group-hover:scale-110"></i>
                            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>

                        <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                            <h3 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                {repo.name}
                            </h3>
                            <p class="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed text-lg">
                                {repo.description || 'No description available'}
                            </p>

                            <div class="flex flex-wrap gap-6 mb-8 text-base">
                                {#if repo.language}
                                    <span class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                                        <span class="w-4 h-4 rounded-full bg-primary-500"></span>
                                        {repo.language}
                                    </span>
                                {/if}
                                <span class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                                    ⭐ {repo.stargazers_count}
                                </span>
                                <span class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                                    🍴 {repo.forks_count}
                                </span>
                            </div>
                        </div>

                        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 flex items-center justify-center z-10 {activeCard === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}">
                            <a 
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                on:click|stopPropagation
                                class="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white font-semibold transition-all duration-300 transform hover:scale-110 shadow-2xl min-w-[200px] {activeCard === index ? 'scale-100' : 'scale-75'}"
                            >
                                <i class="fab fa-github text-xl"></i>
                                <span>View Repository</span>
                            </a>
                        </div>

                        <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/20 transition-all duration-500"></div>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-center text-neutral-600 dark:text-neutral-400">
                No repositories available yet.
            </p>
        {/if}
    </div>
{/if}

<style>
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-100px) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
    }

    .animate-slide-in-left {
        animation: slideInLeft 0.8s ease-out forwards;
    }

    .animate-slide-in-right {
        animation: slideInRight 0.8s ease-out forwards;
    }
</style>