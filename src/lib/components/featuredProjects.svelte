<script lang="ts">
    import type { Project } from '$lib/types';
    import { optimizeImage, getResponsiveImageSrcSet } from '$lib/utils/imageOptimizer';
    import { createSlug } from '$lib/utils/slug';
    import { onMount } from 'svelte';
    import LoadingSpinner from './LoadingSpinner.svelte';
    
    interface Props {
        projects?: Project[];
        error?: string;
        onRetry: () => void;
    }

    let { projects = [], error = '', onRetry }: Props = $props();
    
    let imageLoading: { [key: string]: boolean } = $state({});
    let visibleCards: Set<number> = $state(new Set());
    let observer: IntersectionObserver | null = $state(null);
    let activeCard: number | null = $state(null);

    onMount(() => {
        // Setup Observer for animations
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        visibleCards = new Set([...visibleCards, index]);
                        observer?.unobserve(entry.target); // Only animate once
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        // Wait for DOM to settle
        setTimeout(() => {
            const cards = document.querySelectorAll('.featured-card');
            cards.forEach((card) => observer?.observe(card));
        }, 100);
        
        return () => {
            if (observer) observer.disconnect();
        };
    });

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

<div class="w-full">
    <div class="flex items-end justify-between mb-6">
        <div>
            <h2 class="text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">Featured Projects</h2>
        </div>
    </div>

    {#if error}
        <div class="rounded-xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400 border border-red-100 dark:border-red-900/30">
            {error}
            <button class="ml-4 text-sm font-bold underline hover:text-red-800 transition-colors" onclick={onRetry}>
                Try again
            </button>
        </div>
    {:else if projects.length > 0}
        <!-- GRID LAYOUT: 2 columns on Desktop, 1 on Mobile -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {#each projects.filter(p => p.featured).slice(0, 4) as project, index}
                <!-- 
                   CARD COMPONENT 
                   Fix: Changed 'transition-all' to 'transition-[box-shadow]' to prevent 
                   border-radius clipping artifacts during animation.
                -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div 
                    data-index={index}
                    class="featured-card group relative h-[400px] md:h-[480px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary-900/10 transition-[box-shadow] duration-500"
                    class:opacity-0={!visibleCards.has(index)}
                    class:animate-fade-in-up={visibleCards.has(index)}
                    style="animation-delay: {index * 100}ms;"
                    onclick={() => toggleModal(index)}
                    role="button"
                    tabindex="0"
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
                                class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 {activeCard === index ? 'scale-110' : ''}"
                                onload={() => handleImageLoad(project.id)}
                                onloadstart={() => handleImageLoadStart(project.id)}
                            />
                        {/if}
                    </div>

                    <!-- Gradient Overlay (Deepens on Hover/Active) -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-80 transition-opacity duration-500 group-hover:opacity-95 {activeCard === index ? 'opacity-95' : ''}"></div>
                    
                    <!-- Subtle Gradient Glow on Hover/Active -->
                    <div class="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 {activeCard === index ? 'opacity-100' : ''} mix-blend-overlay"></div>

                    <!-- Content Container -->
                    <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 transition-all duration-500">
                        
                        <!-- Tech Tags (Visible immediately, slide up slightly on hover/active) -->
                        <div class="flex flex-wrap gap-2 mb-3 transform transition-transform duration-500 group-hover:-translate-y-2 {activeCard === index ? '-translate-y-2' : ''}">
                            {#each project.technologies.slice(0, 3) as tech}
                                <span class="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/10 group-hover:bg-primary-500/20 group-hover:border-primary-500/30 transition-colors {activeCard === index ? 'bg-primary-500/20 border-primary-500/30' : ''}">
                                    {tech}
                                </span>
                            {/each}
                            {#if project.technologies.length > 3}
                                <span class="px-2 py-1 rounded-full text-[10px] font-bold text-white/60">+{project.technologies.length - 3}</span>
                            {/if}
                        </div>

                        <!-- Title -->
                        <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight transform transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-primary-200 {activeCard === index ? '-translate-y-1 text-primary-200' : ''}">
                            {project.title}
                        </h3>

                        <!-- Description & Actions (Reveal on Hover/Active) -->
                        <!-- 
                           Logic: By default max-h-0 opacity-0. 
                           On group-hover OR activeCard match, expand. 
                        -->
                        <div class="max-h-0 opacity-0 group-hover:max-h-[600px] group-hover:opacity-100 md:group-hover:max-h-40 {activeCard === index ? 'max-h-[600px] opacity-100' : ''} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                            <p class="text-neutral-300 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed">
                                {truncateText(project.description, 150)}
                            </p>
                            
                            <!-- Action Buttons -->
                            <div class="flex flex-col md:flex-row gap-3 pt-2 border-t border-white/10">
                                {#if project.url}
                                    <a 
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onclick={(e) => e.stopPropagation()}
                                        class="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white text-neutral-900 hover:bg-primary-50 font-semibold text-sm transition-all duration-300 hover:scale-105"
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
                                        onclick={(e) => e.stopPropagation()}
                                        class="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-semibold text-sm transition-all duration-300 hover:scale-105 border border-white/10"
                                    >
                                        <i class="fab fa-github"></i>
                                        <span>Code</span>
                                    </a>
                                {/if}
                                <a 
                                    href="/projects/{createSlug(project.title)}"
                                    onclick={(e) => e.stopPropagation()}
                                    class="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-semibold text-sm transition-all duration-300 hover:scale-105 border border-white/10"
                                >
                                    <i class="fas fa-info-circle"></i>
                                    <span>Details</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center py-20 text-neutral-400">
            <i class="fas fa-layer-group text-4xl mb-4 opacity-50"></i>
            <p>No featured projects available yet.</p>
        </div>
    {/if}
</div>

<style>
    /* Animation Keyframes with 'both' fill-mode to prevent blinking */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.97);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        backface-visibility: hidden;
        will-change: transform, opacity;
    }

    .featured-card {
        /* 
           FIX: Explicitly force hardware acceleration (translateZ) to ensure
           border-radius is preserved during transitions.
           Add a mask so mobile/Safari correctly clips children during transforms,
           and use paint containment to help with rendering stability.
        */
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        will-change: transform, opacity, box-shadow;
        /* Ensure overflow clipping of children on iOS/Safari during transforms */
        overflow: hidden;
        -webkit-mask-image: -webkit-linear-gradient(#000, #000);
        mask-image: linear-gradient(#000, #000);
        /* Improve paint isolation for smoother animations */
        contain: paint;
    }

    .featured-card.opacity-0 {
        opacity: 0;
        transform: translateY(40px) scale(0.97);
    }
</style>