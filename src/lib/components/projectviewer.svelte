<script lang="ts">
	import { getResponsiveImageSrcSet, optimizeImage } from './../utils/imageOptimizer';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import { projects } from '$lib/stores/projects';
    import LoadingSpinner from './LoadingSpinner.svelte';
    
    export let searchQuery = '';
    export let selectedFilter = 'all';
    export let categorizeProject: (title: string, description: string, technologies: string[]) => string[];
    
    let isMobile = false;
    let currentIndex = 0;
    let startX: number;
    let deltaX = spring(0);
    let startY: number;
    let deltaY = spring(0);
    let opacity = spring(1);
    let scale = spring(1);
    
    let loading = false;
    let imageLoading: { [key: number]: boolean } = {};
    let visibleCards: Set<number> = new Set();
    let observer: IntersectionObserver | null = null;
    let activeCard: number | null = null;

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Setup observer for desktop scroll animations
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

            // Observe all project cards after a short delay
            setTimeout(() => {
                const cards = document.querySelectorAll('.project-card');
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

    // Make all cards visible on mobile, let observer handle desktop
    $: if ($projects.length > 0 && isMobile) {
        // On mobile, show all cards immediately without animations
        const allIndices = Array.from({ length: $projects.length }, (_, i) => i);
        visibleCards = new Set(allIndices);
    }

    function handleImageLoad(index: number) {
        imageLoading[index] = false;
    }

    function handleImageLoadStart(index: number) {
        imageLoading[index] = true;
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

    function handleTouchEnd() {
        if (!isMobile || startX === undefined) return;
        const threshold = 80;

        if ($deltaX < -threshold && currentIndex < filteredProjects.length - 1) {
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

    function openProject(url?: string) {
        if (url) {
            window.open(url, '_blank');
        }
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
<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
 <!-- svelte-ignore a11y_click_events_have_key_events -->
{#if loading}
    <LoadingSpinner />
{:else}
    <div class="w-full space-y-8">
        {#each filteredProjects as project, index}
            <div 
                data-index={index}
                on:click={() => toggleModal(index)}
                on:keydown={(e) => e.key === 'Enter' && toggleModal(index)}
                role="button"
                tabindex="0"
                class="project-card group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row {index % 2 === 1 ? 'md:flex-row-reverse' : ''} cursor-pointer"
                class:opacity-0={!isMobile && !visibleCards.has(index)}
                class:animate-slide-in-left={!isMobile && visibleCards.has(index) && index % 2 === 0}
                class:animate-slide-in-right={!isMobile && visibleCards.has(index) && index % 2 === 1}
            >
                <!-- Image Container -->
                <div class="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden">
                    {#if imageLoading[index]}
                        <div class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                            <LoadingSpinner />
                        </div>
                    {/if}
                    <img 
                        src={optimizeImage(project.image, { width: 800, format: 'webp' })}
                        srcset={getResponsiveImageSrcSet(project.image)}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        alt={project.title}
                        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        on:load={() => handleImageLoad(index)}
                        on:loadstart={() => handleImageLoadStart(index)}
                    />
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>

                <!-- Content -->
                <div class="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center relative">
                    <h3 class="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3 md:mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p class="text-neutral-700 dark:text-neutral-300 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
                        {project.description}
                    </p>

                    <!-- Technologies -->
                    <div class="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                        {#each project.technologies as tech}
                            <span class="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium bg-primary-100/80 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-300/50 dark:border-primary-700/50 backdrop-blur-sm">
                                {tech}
                            </span>
                        {/each}
                    </div>
                </div>

                <!-- Action Buttons Modal Overlay -->
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

                <!-- Decorative element -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/20 transition-all duration-500"></div>
            </div>
        {/each}
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

    .project-card {
        position: relative;
    }

    .project-card::before {
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
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .project-card:hover::before {
        opacity: 1;
    }

    :global(.dark) .project-card::before {
        background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    }
</style>