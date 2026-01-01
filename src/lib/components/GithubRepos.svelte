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
    // Track which card is expanded on small screens (tap-to-toggle)
    let expandedCards: Set<number> = new Set();
    // Store element refs for per-card detail containers to animate height
    let detailEls: Map<number, HTMLElement> = new Map();
    let isSmall: boolean = false;
    let mediaQueryList: MediaQueryList | null = null;
    // Responsive columns count (1/2/3)
    let columns: number = 3;
    let observer: IntersectionObserver | null = null;

    onMount(() => {
        loadRepositories();

        // Responsive column sizing helper
        function updateColumns() {
            if (typeof window === 'undefined') return;
            const w = window.innerWidth;
            columns = w < 768 ? 1 : (w < 1024 ? 2 : 3);
        }

        // setup small-screen detection for tap-to-toggle behaviour
        if (typeof window !== 'undefined') {
            // initialize columns and keep in sync with resize
            updateColumns();
            window.addEventListener('resize', updateColumns);

            mediaQueryList = window.matchMedia('(max-width: 767px)');
            const handleMQ = (e: MediaQueryListEvent) => {
                const wasSmall = isSmall;
                isSmall = e.matches;

                // Switching to Desktop: Reset inline styles to let CSS classes handle hover effects
                if (!isSmall && wasSmall) {
                    expandedCards = new Set();
                    detailEls.forEach(node => {
                        node.style.maxHeight = '';
                        node.style.opacity = '';
                        node.style.overflow = '';
                    });
                }
                
                // Switching to Mobile: Ensure cards start collapsed
                if (isSmall && !wasSmall) {
                    expandedCards = new Set();
                    detailEls.forEach(node => {
                        node.style.maxHeight = '0px';
                        node.style.opacity = '0';
                        node.style.overflow = 'hidden';
                    });
                }
            };

            // Initialize state immediately
            isSmall = mediaQueryList.matches;
            if ((mediaQueryList as any).addEventListener) {
                mediaQueryList.addEventListener('change', handleMQ as EventListener);
            } else if ((mediaQueryList as any).addListener) {
                (mediaQueryList as any).addListener(handleMQ as any);
            }

            const handleOutsideClick = (e: MouseEvent) => {
                if (!isSmall) return;
                const target = e.target as HTMLElement;
                setTimeout(() => {
                    if (!target.closest('.repo-card') && expandedCards.size > 0) {
                        expandedCards.forEach(i => {
                            const n = detailEls.get(i);
                            if (n) animateDetail(n, false);
                        });
                        expandedCards = new Set();
                    }
                }, 10);
            };
            window.addEventListener('click', handleOutsideClick);

            return () => {
                if (observer) observer.disconnect();
                if (mediaQueryList) {
                    if ((mediaQueryList as any).removeEventListener) {
                        mediaQueryList.removeEventListener('change', handleMQ as EventListener);
                    } else if ((mediaQueryList as any).removeListener) {
                        (mediaQueryList as any).removeListener(handleMQ as any);
                    }
                }
                window.removeEventListener('click', handleOutsideClick);
                window.removeEventListener('resize', updateColumns);
            };
        }

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

    // Toggle card details on small screens (tap behavior)
    function toggleDetails(index: number) {
        const willExpand = !expandedCards.has(index);
        const node = detailEls.get(index);

        if (willExpand) {
            // collapse any other expanded cards first
            expandedCards.forEach(i => {
                if (i !== index) {
                    const n = detailEls.get(i);
                    if (n) animateDetail(n, false);
                }
            });

            // expand the requested card
            if (isSmall && node) animateDetail(node, true);
            // only one card expanded at a time on mobile
            expandedCards = new Set([index]);
        } else {
            // collapse this card
            if (isSmall && node) animateDetail(node, false);
            expandedCards = new Set();
        }
    }

    // Action to register detail container elements so we can animate them
    function registerDetail(node: HTMLElement, index: number) {
        detailEls.set(index, node);
        // initialize collapsed state for small screens
        if (isSmall && !expandedCards.has(index)) {
            node.style.maxHeight = '0px';
            node.style.opacity = '0';
            node.style.overflow = 'hidden';
        }
        return {
            update(newIndex: number) {
                detailEls.delete(index);
                index = newIndex;
                detailEls.set(index, node);
            },
            destroy() {
                detailEls.delete(index);
            }
        };
    }

    // Perform a manual smooth expand/collapse animation by toggling max-height and opacity
    function animateDetail(node: HTMLElement, expand: boolean) {
        if (!node) return;
        if (expand) {
            const target = `${node.scrollHeight}px`;
            node.style.overflow = 'hidden';
            node.style.transition = 'max-height 350ms cubic-bezier(0.16,1,0.3,1), opacity 250ms ease';
            node.style.maxHeight = '0px';
            node.style.opacity = '0';
            // force reflow
            node.getBoundingClientRect();
            node.style.maxHeight = target;
            node.style.opacity = '1';

            const onEnd = (e: TransitionEvent) => {
                if (e.propertyName === 'max-height') {
                    node.style.transition = '';
                    node.removeEventListener('transitionend', onEnd);
                }
            };
            node.addEventListener('transitionend', onEnd);
        } else {
            const cur = node.scrollHeight;
            node.style.overflow = 'hidden';
            node.style.transition = 'max-height 300ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease';
            node.style.maxHeight = `${cur}px`;
            node.style.opacity = '1';
            // force reflow
            node.getBoundingClientRect();
            node.style.maxHeight = '0px';
            node.style.opacity = '0';

            const onEnd = (e: TransitionEvent) => {
                if (e.propertyName === 'max-height') {
                    node.style.transition = '';
                    node.removeEventListener('transitionend', onEnd);
                }
            };
            node.addEventListener('transitionend', onEnd);
        }
    }

    // Responsive animation delay helper: small per-row stagger so later rows don't take too long
    function getAnimationDelay(index: number) {
        const colIndex = index % columns;
        const rowIndex = Math.floor(index / columns);
        const delayMs = colIndex * 80 + rowIndex * 30; // small per-row stagger
        return `${delayMs}ms`;
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
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-fr"
                     role="grid"
                     aria-label="GitHub repository cards - tap cards to expand details">
                    {#each filteredRepos as repo, index}
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <div 
                                data-index={index}
                                class="repo-card group relative h-[320px] md:h-[380px] w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary-900/10 transition-[box-shadow] duration-500"
                                class:opacity-0={!visibleCards.has(index)}
                                class:animate-fade-in-up={visibleCards.has(index)}
                                style="animation-delay: {getAnimationDelay(index)};"
                                on:click={(e) => { if (isSmall) { e.stopPropagation(); toggleDetails(index); } }}
                                on:keydown={(e) => { if (isSmall && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) { e.preventDefault(); e.stopPropagation(); toggleDetails(index); } }}
                                role="button"
                                tabindex="0"
                                aria-expanded={isSmall ? expandedCards.has(index) : undefined}
                            >
                                <!-- Background GitHub Icon -->
                                <div class="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                                    <i class="fab fa-github text-[200px] text-white/10 group-hover:text-white/20 transition-all duration-1000"></i>
                                </div>

                                <!-- Gradient Overlay (Deepens on Hover) -->
                                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-80 transition-opacity duration-500 group-hover:opacity-95"></div>
                                
                                <!-- Subtle Gradient Glow on Hover -->
                                <div class="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay"></div>

                                <!-- Content Container -->
                                <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pb-8 md:pb-10 z-10 transition-all duration-500">
                                    
                                    <!-- Language Tag -->
                                    {#if repo.language}
                                        <div class="flex flex-wrap gap-2 mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                                            <span class="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/10 group-hover:bg-primary-500/20 group-hover:border-primary-500/30 transition-colors">
                                                {repo.language}
                                            </span>
                                        </div>
                                    {/if}

                                    <!-- Title -->
                                    <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight transform transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-primary-200">
                                        {repo.name}
                                    </h3>

                                    <!-- Description & Actions (Reveal on Hover/Active) -->
                                    <div use:registerDetail={index} class="max-h-0 opacity-0 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                                        <p class="text-neutral-300 text-sm md:text-base mb-4 line-clamp-2 leading-relaxed">
                                            {repo.description || 'No description available'}
                                        </p>
                                        
                                        <!-- Stats & Action -->
                                        <div class="flex items-center gap-3 mb-3 text-xs text-neutral-400">
                                            <span class="flex items-center gap-1.5">
                                                <i class="fas fa-star text-yellow-400"></i> {repo.stargazers_count}
                                            </span>
                                            <span class="flex items-center gap-1.5">
                                                <i class="fas fa-code-branch text-blue-400"></i> {repo.forks_count}
                                            </span>
                                        </div>

                                        <!-- Action Button -->
                                        <div class="relative z-20 pt-2 border-t border-white/10">
                                            <a 
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                on:click|stopPropagation
                                                class="flex items-center justify-center gap-1.5 px-2 py-1 md:px-3 md:py-2 rounded-md bg-white text-neutral-900 hover:bg-primary-50 font-semibold text-[11px] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 origin-bottom z-30 w-full"
                                            >
                                                <i class="fab fa-github text-[11px]"></i>
                                                <span>View Repository</span>
                                            </a>
                                        </div>
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
        will-change: transform, opacity;
    }

    .repo-card {
        will-change: transform, opacity;
        transition: none;
    }

    .repo-card.opacity-0 {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: none !important;
    }
</style>