<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import axios from 'axios';
    import { createEventDispatcher } from 'svelte';
    import { githubService } from '$lib/services/github';

    const dispatch = createEventDispatcher();
    
    export let searchQuery = '';
    export let selectedFilter = 'all';
    export let categorizeProject: (title: string, description: string, technologies: string[]) => string[];

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
    let visibleCards: Set<number> = new Set();
    let observer: IntersectionObserver | null = null;
    let activeCard: number | null = null;

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
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
            // On desktop, use Intersection Observer
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
                const cards = document.querySelectorAll('.repo-card');
                cards.forEach((card) => observer?.observe(card));
            }, 200);
        }
    }

    // Make all cards visible on mobile, or first few on desktop
    // Make all cards visible on mobile, let observer handle desktop
    $: if (repos.length > 0 && isMobile) {
        // On mobile, show all cards immediately without animations
        const allIndices = Array.from({ length: repos.length }, (_, i) => i);
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
            dispatch('error');
        }
    }

    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }

    function toggleModal(index: number) {
        activeCard = activeCard === index ? null : index;
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
    
    function handleTouchEnd() {
        if (!isMobile || startX === undefined) return;
        const threshold = 80;

        if ($deltaX < -threshold && currentIndex < filteredRepos.length - 1) {
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
        <div class="w-full overflow-visible">  
            {#if loading}
                <div class="flex justify-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div>
                </div>
            {:else if error}
                <div class="text-red-500 text-center">{error}</div>
            {:else}
                <div class="w-full space-y-8">
                    {#each filteredRepos as repo, index}
                            <div 
                                data-index={index}
                                on:click={() => toggleModal(index)}
                                on:keydown={(e) => e.key === 'Enter' && toggleModal(index)}
                                role="button"
                                tabindex="0"
                                class="repo-card group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row {index % 2 === 1 ? 'md:flex-row-reverse' : ''} cursor-pointer"
                                class:opacity-0={!isMobile && !visibleCards.has(index)}
                                class:animate-slide-in-left={!isMobile && visibleCards.has(index) && index % 2 === 0}
                                class:animate-slide-in-right={!isMobile && visibleCards.has(index) && index % 2 === 1}
                            >
                                <!-- Icon/Header Section -->
                                <div class="relative w-full md:w-1/2 h-64 md:h-96 bg-gradient-to-br from-primary-500/20 to-primary-700/30 flex items-center justify-center overflow-hidden">
                                    <i class="fab fa-github text-9xl text-white/30 group-hover:text-white/50 transition-all duration-500 group-hover:scale-110"></i>
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>

                                <!-- Content -->
                                <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                                    <h3 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                        {repo.name}
                                    </h3>
                                    <p class="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed text-lg">
                                        {repo.description || 'No description available'}
                                    </p>

                                    <!-- Stats -->
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

                                <!-- Action Button Modal Overlay -->
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

                                <!-- Decorative element -->
                                <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/20 transition-all duration-500"></div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </section>
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
     

    .animate-slide-in-left {
        animation: slideInLeft 0.8s ease-out forwards;
    }

    .animate-slide-in-right {
        animation: slideInRight 0.8s ease-out forwards;
    }   }
    }

    .repo-card {
        position: relative;
    }

    .repo-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 1rem;
        padding: 2px;
        background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .repo-card:hover::before {
        opacity: 1;
    }

    :global(.dark) .repo-card::before {
        background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    }
</style>