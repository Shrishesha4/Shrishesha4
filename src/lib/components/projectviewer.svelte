<script lang="ts">
    import { getResponsiveImageSrcSet, optimizeImage } from './../utils/imageOptimizer';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { projects } from '$lib/stores/projects';
    import LoadingSpinner from './LoadingSpinner.svelte';
    
    export let searchQuery = '';
    export let selectedFilter = 'all';
    export let categorizeProject: (title: string, description: string, technologies: string[]) => string[];
    
    let imageLoading: { [key: number]: boolean } = {};
    let visibleCards: Set<number> = new Set();
    let observer: IntersectionObserver | null = null;

    onMount(() => {
        setupObserver();
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
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card) => observer?.observe(card));
        }, 100);
    }

    // Re-run observer when filter changes
    $: if (browser && filteredProjects) {
        setTimeout(() => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card) => observer?.observe(card));
        }, 100);
    }

    function handleImageLoad(index: number) {
        imageLoading[index] = false;
    }

    function handleImageLoadStart(index: number) {
        imageLoading[index] = true;
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-fr">
        {#each filteredProjects as project, index}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                data-index={index}
                class="project-card group flex flex-col rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                class:opacity-0={!visibleCards.has(index)}
                class:animate-fade-in-up={visibleCards.has(index)}
                style="animation-delay: {(index % 6) * 80}ms;"
            >
                <!-- Image Container -->
                <div class="relative h-48 overflow-hidden bg-neutral-900/50">
                    {#if imageLoading[index]}
                        <div class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 z-10">
                            <LoadingSpinner />
                        </div>
                    {/if}
                    <img 
                        src={optimizeImage(project.image, { width: 600, format: 'webp' })}
                        srcset={getResponsiveImageSrcSet(project.image)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        alt={project.title}
                        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        on:load={() => handleImageLoad(index)}
                        on:loadstart={() => handleImageLoadStart(index)}
                    />
                    
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <!-- Overlay Background -->
                    <div class="absolute inset-0 bg-neutral-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] z-10"></div>

                    <!-- Overlay Actions -->
                    <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-8 group-hover:translate-y-0">
                        {#if project.url}
                            <a 
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white text-neutral-900 hover:bg-primary-50 font-semibold text-sm transition-all duration-300 hover:scale-105"
                            >
                                <i class="fas fa-external-link-alt"></i>
                                <span>Live Demo</span>
                            </a>
                        {/if}
                        {#if project.github}
                            <a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-semibold text-sm transition-all duration-300 hover:scale-105 border border-white/10"
                            >
                                <i class="fab fa-github"></i>
                                        <span>Code</span>
                            </a>
                        {/if}
                        <a 
                            href="/projects/{project.id}"
                            class="w-full flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-semibold text-sm transition-all duration-300 hover:scale-105 border border-white/10"
                        >
                            <i class="fas fa-info-circle"></i>
                            <span>Details</span>
                        </a>
                    </div>
                </div>

                <!-- Content -->
                <div class="flex flex-col flex-1 p-5">
                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.title}
                    </h3>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>

                    <!-- Technologies -->
                    <div class="mt-auto pt-4 flex flex-wrap gap-2">
                        {#each (project.technologies || []).slice(0, 4) as tech}
                            <span class="px-2.5 py-1 rounded-md text-xs font-medium bg-primary-50/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/30">
                                {tech}
                            </span>
                        {/each}
                        {#if (project.technologies || []).length > 4}
                            <span class="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-500">
                                +{(project.technologies?.length || 0) - 4}
                            </span>
                        {/if}
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

    .project-card {
        will-change: transform, opacity;
        transition: none;
    }

    .project-card.opacity-0 {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: none !important;
    }
</style>