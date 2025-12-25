<script lang="ts">
    import type { Project } from '$lib/types';
    import { optimizeImage, getResponsiveImageSrcSet } from '$lib/utils/imageOptimizer';
    import { onMount } from 'svelte';
    import LoadingSpinner from './LoadingSpinner.svelte';
    
    export let projects: Project[] = [];
    export let error: string = '';
    export let onRetry: () => void;
    let imageLoading: { [key: string]: boolean } = {};
    let isMobile = false;
    let visibleCards: Set<number> = new Set();
    let observer: IntersectionObserver | null = null;
    let activeCard: number | null = null;

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        if (!isMobile) {
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
                const cards = document.querySelectorAll('.featured-project-card');
                cards.forEach((card) => observer?.observe(card));
            }, 200);
        }
        
        return () => {
            if (observer) {
                observer.disconnect();
            }
            window.removeEventListener('resize', checkMobile);
        };
    });

    $: if (projects.length > 0 && isMobile) {
        const allIndices = Array.from({ length: Math.min(projects.length, 4) }, (_, i) => i);
        visibleCards = new Set(allIndices);
    }

    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }

    function toggleModal(index: number) {
        activeCard = activeCard === index ? null : index;
    }

    function handleImageLoad(projectId: string) {
        imageLoading[projectId] = false;
    }

    function handleImageLoadStart(projectId: string) {
        imageLoading[projectId] = true;
    }

    function truncateText(text: string, limit: number = 120): string {
        if (!text) return '';
        if (text.length <= limit) return text;
        return text.slice(0, limit).trim() + '...';
    }
</script>

<div>
    <h2 class="mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100">Featured Projects</h2>
    {#if error}
        <div class="mb-8 rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400">
            {error}
            <button class="ml-4 text-sm underline" on:click={onRetry}>
                Try again
            </button>
        </div>
    {:else if projects.length > 0}
        <div class="space-y-8">
            {#each projects.slice(0, 4) as project, index}
                <div 
                    data-index={index}
                    on:click={() => toggleModal(index)}
                    on:keydown={(e) => e.key === 'Enter' && toggleModal(index)}
                    role="button"
                    tabindex="0"
                    class="featured-project-card group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row {index % 2 === 1 ? 'md:flex-row-reverse' : ''} cursor-pointer"
                    class:opacity-0={!isMobile && !visibleCards.has(index)}
                    class:animate-slide-in-left={!isMobile && visibleCards.has(index) && index % 2 === 0}
                    class:animate-slide-in-right={!isMobile && visibleCards.has(index) && index % 2 === 1}
                >
                    <div class="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden">
                        {#if imageLoading[project.id]}
                            <div class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                                <LoadingSpinner />
                            </div>
                        {/if}
                        {#if project.image}
                            <img 
                                src={optimizeImage(project.image, { width: 800, format: 'webp' })}
                                srcset={getResponsiveImageSrcSet(project.image)}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                alt={project.title}
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                on:load={() => handleImageLoad(project.id)}
                                on:loadstart={() => handleImageLoadStart(project.id)}
                            />
                        {/if}
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    </div>

                    <div class="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center relative">
                        <h3 class="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3 md:mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p class="text-neutral-700 dark:text-neutral-300 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
                            {truncateText(project.description)}
                        </p>

                        {#if project.technologies && project.technologies.length > 0}
                            <div class="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                                {#each project.technologies as tech}
                                    <span class="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium bg-primary-100/80 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-300/50 dark:border-primary-700/50 backdrop-blur-sm">
                                        {tech}
                                    </span>
                                {/each}
                            </div>
                        {/if}
                    </div>

                    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 flex items-center justify-center z-10 {activeCard === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}">
                        <div class="flex flex-col sm:flex-row gap-4 transition-transform duration-500 {activeCard === index ? 'scale-100' : 'scale-75'}">
                            {#if project.url}
                                <a 
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    on:click|stopPropagation
                                    class="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold transition-all duration-300 transform hover:scale-110 shadow-2xl min-w-[160px]"
                                >
                                    <i class="fas fa-globe text-xl"></i>
                                    <span>Live Demo</span>
                                </a>
                            {/if}
                            {#if project.github}
                                <a 
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    on:click|stopPropagation
                                    class="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white font-semibold transition-all duration-300 transform hover:scale-110 shadow-2xl min-w-[160px]"
                                >
                                    <i class="fab fa-github text-xl"></i>
                                    <span>Code</span>
                                </a>
                            {/if}
                        </div>
                    </div>

                    <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/20 transition-all duration-500"></div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-center text-neutral-600 dark:text-neutral-400">
            No projects available yet.
        </p>
    {/if}
</div>

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