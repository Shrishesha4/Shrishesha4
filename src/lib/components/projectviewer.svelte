<script lang="ts">
    import { getResponsiveImageSrcSet, optimizeImage } from './../utils/imageOptimizer';
    import { createSlug } from './../utils/slug';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { projects } from '$lib/stores/projects';
    import LoadingSpinner from './LoadingSpinner.svelte';
    
    export let searchQuery = '';
    export let selectedFilter = 'all';
    export let categorizeProject: (title: string, description: string, technologies: string[]) => string[];
    
    let imageLoading: { [key: string]: boolean } = {};
    let visibleCards: Set<number> = new Set();
    // Track which card is expanded on small screens (tap-to-toggle)
    let expandedCards: Set<number> = new Set();
    // Store element refs for per-card detail containers to animate height
    let detailEls: Map<number, HTMLElement> = new Map();
    let isSmall: boolean = false;
    let mediaQueryList: MediaQueryList | null = null;
    let observer: IntersectionObserver | null = null;

    onMount(() => {
        setupObserver();

        // setup small-screen detection for tap-to-toggle behaviour
        if (typeof window !== 'undefined') {
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
                    if (!target.closest('.featured-card') && expandedCards.size > 0) {
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
            };
        }

        return () => {
            if (observer) observer.disconnect();
        };
    });

    function setupObserver() {
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
            const cards = document.querySelectorAll('.featured-card');
            cards.forEach((card) => observer?.observe(card));
        }, 100);
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
                    // FIX: Do not clear maxHeight here, or the 'max-h-0' class will snap it shut.
                    // The media query listener handles cleaning this up when switching to desktop.
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

    // Re-run observer when filter changes
    $: if (browser && filteredProjects) {
        setTimeout(() => {
            const cards = document.querySelectorAll('.featured-card');
            cards.forEach((card) => observer?.observe(card));
        }, 100);
    }

    function handleImageLoad(index: string) {
        imageLoading[index] = false;
    }

    function handleImageLoadStart(index: string) {
        imageLoading[index] = true;
    }

    function truncateText(text: string, limit: number = 120): string {
        if (!text) return '';
        if (text.length <= limit) return text;
        return text.slice(0, limit).trim() + '...';
    }
    
    // Filter projects based on search query and selected filter
    $: filteredProjects = $projects.filter(project => {
        // Search filter
        const matchesSearch = !searchQuery || 
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.technologies?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Category filter - use intelligent categorization
        const matchesFilter = selectedFilter === 'all' || 
            categorizeProject(project.title, project.description, project.technologies || [])
                .includes(selectedFilter);
        
        return matchesSearch && matchesFilter;
    });
</script>

{#if $projects.length === 0}
    <LoadingSpinner />
{:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-fr"
         role="grid"
         aria-label="Project cards - tap cards to expand details">
        {#each filteredProjects as project, index}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div 
                    data-index={index}
                    class="featured-card group relative h-[320px] md:h-[380px] w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary-900/10 transition-[box-shadow] duration-500"
                    class:opacity-0={!visibleCards.has(index)}
                    class:animate-fade-in-up={visibleCards.has(index)}
                    style="animation-delay: {index * 100}ms;"
                    on:click={(e) => { if (isSmall) { e.stopPropagation(); toggleDetails(index); } }}
                    on:keydown={(e) => { if (isSmall && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) { e.preventDefault(); e.stopPropagation(); toggleDetails(index); } }}
                    role="button"
                    tabindex="0"
                    aria-expanded={isSmall ? expandedCards.has(index) : undefined}
                >
                    <!-- Background Image -->
                    <div class="absolute inset-0 bg-neutral-900">
                        {#if imageLoading[project.id]}
                            <div class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 z-20">
                                <LoadingSpinner />
                            </div>
                        {/if}
                        {#if project.image}
                            <img 
                                src={optimizeImage(project.image, { width: 800, format: 'webp' })}
                                srcset={getResponsiveImageSrcSet(project.image)}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                alt={project.title}
                                class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                on:load={() => handleImageLoad(project.id)}
                                on:loadstart={() => handleImageLoadStart(project.id)}
                            />
                        {/if}
                    </div>

                    <!-- Gradient Overlay (Deepens on Hover/Active) -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-80 transition-opacity duration-500 group-hover:opacity-95"></div>
                    
                    <!-- Subtle Gradient Glow on Hover/Active -->
                    <div class="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay"></div>

                    <!-- Content Container -->
                    <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pb-8 md:pb-10 z-10 transition-all duration-500">
                        
                        <!-- Tech Tags (Visible immediately, slide up slightly on hover/active) -->
                        <div class="flex flex-wrap gap-2 mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                            {#each project.technologies.slice(0, 3) as tech}
                                <span class="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/10 group-hover:bg-primary-500/20 group-hover:border-primary-500/30 transition-colors">
                                    {tech}
                                </span>
                            {/each}
                            {#if project.technologies.length > 3}
                                <span class="px-2 py-1 rounded-full text-[10px] font-bold text-white/60">+{project.technologies.length - 3}</span>
                            {/if}
                        </div>

                        <!-- Title -->
                        <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight transform transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-primary-200">
                            {project.title}
                        </h3>

                        <!-- Description & Actions (Reveal on Hover/Active) -->
                        <!-- 
                           Logic: On small screens the description/actions are visible by default (touch devices),
                           while on medium+ screens they remain collapsed and reveal on hover.
                        -->
                        <div use:registerDetail={index} class="max-h-0 opacity-0 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                            <p class="text-neutral-300 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed">
                                {truncateText(project.description, 150)}
                            </p>
                            
                            <!-- Action Buttons -->
                            <div class="relative z-20 grid grid-cols-3 gap-2 pt-2 border-t border-white/10 md:flex md:flex-row md:gap-2">
                                {#if project.url}
                                    <a 
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        on:click|stopPropagation
                                        class="flex items-center justify-center gap-1 px-2 py-1 md:px-3 md:py-2 rounded-md bg-white text-neutral-900 hover:bg-primary-50 font-semibold text-[11px] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 origin-bottom z-30"
                                    >
                                        <i class="fas fa-external-link-alt text-[11px]"></i>
                                        <span class="truncate">Live Demo</span>
                                    </a>
                                {/if}
                                {#if project.github}
                                    <a 
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        on:click|stopPropagation
                                        class="flex items-center justify-center gap-1 px-2 py-1 md:px-3 md:py-2 rounded-md bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-semibold text-[11px] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 origin-bottom z-30 border border-white/10"
                                    >
                                        <i class="fab fa-github text-[11px]"></i>
                                        <span class="truncate">Code</span>
                                    </a>
                                {/if}
                                <a 
                                    href={`/projects/${createSlug(project.title)}`}
                                    on:click|stopPropagation
                                    class="flex items-center justify-center gap-1 px-2 py-1 md:px-3 md:py-2 rounded-md bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-semibold text-[11px] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 origin-bottom z-30 border border-white/10"
                                >
                                    <i class="fas fa-info-circle text-[11px]"></i>
                                    <span class="truncate">Details</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        {/each}
    </div>
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

    .featured-card {
        will-change: transform, opacity;
        transition: none;
    }

    .featured-card.opacity-0 {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: none !important;
    }
</style>