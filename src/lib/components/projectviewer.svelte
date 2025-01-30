<script lang="ts">
	import { getResponsiveImageSrcSet, optimizeImage } from './../utils/imageOptimizer';
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import { projects } from '$lib/stores/projects';
    import LoadingSpinner from './LoadingSpinner.svelte';
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

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    });

    function handleImageLoad(index: number) {
        imageLoading[index] = false;
    }

    function handleImageLoadStart(index: number) {
        imageLoading[index] = true;
    }

    function checkMobile() {
        isMobile = window.innerWidth < 768;
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
        const currentY = e.touches[0].clientY;
        deltaX.set(currentX - startX);
        deltaY.set(currentY - startY);
        
        // Reduced intensity of effects
        const distance = Math.abs(currentX - startX);
        opacity.set(1 - Math.min(distance / 800, 0.3));
        scale.set(1 - Math.min(distance / 2000, 0.05));
    }

    function handleTouchEnd() {
        if (!isMobile || startX === undefined) return;
        const threshold = 80;
        
        if ($deltaX < -threshold && currentIndex < $projects.length - 1) {
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
            deltaY.set(0);
            opacity.set(1);
            scale.set(1);
        }
        startX = startY = 0;
    }

    function openProject(url?: string) {
        if (url) {
            window.open(url, '_blank');
        }
    }
</script>
<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
{#if loading}
    <LoadingSpinner />
{:else}
    <div class="overflow-visible">
        {#if isMobile}
            <div 
                class="w-full flex flex-col items-center justify-center relative mt-6 overflow-visible"
                on:touchstart|passive={handleTouchStart}
                on:touchmove|passive={handleTouchMove}
                on:touchend|passive={handleTouchEnd}
            >
                {#if $projects[currentIndex]}
                    <div 
                        class="w-[85vw] h-auto min-h-[50vh] bg-neutral-200 dark:bg-neutral-800 rounded-2xl shadow-lg transition-all duration-200 overflow-hidden"
                        style="transform: translateX({$deltaX * 0.5}px) translateY({$deltaY * 0.3}px) rotate({$deltaX * 0.05}deg) scale({$scale}); opacity: {$opacity};"
                    >
                        <div class="relative w-full h-48">
                            {#if imageLoading[currentIndex]}
                                <div class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                                    <LoadingSpinner />
                                </div>
                            {/if}
                            <img 
                                src={optimizeImage($projects[currentIndex].image, { width: 800, format: 'webp' })}
                                srcset={getResponsiveImageSrcSet($projects[currentIndex].image)}
                                sizes="(max-width: 768px) 100vw, 800px"
                                alt={$projects[currentIndex].title}
                                class="w-full h-full object-cover"
                                on:load={() => handleImageLoad(currentIndex)}
                                on:loadstart={() => handleImageLoadStart(currentIndex)}
                            />
                        </div>
                        <div class="p-5">
                            <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                                {$projects[currentIndex].title}
                            </h2>
                            <p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                {$projects[currentIndex].description}
                            </p>
                            <div class="flex flex-wrap gap-2 mt-4">
                                {#each $projects[currentIndex].technologies as tech}
                                    <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-xs">
                                        {tech}
                                    </span>
                                {/each}
                            </div>
                            <div class="flex gap-3 mt-6">
                                {#if $projects[currentIndex].url}
                                    <button 
                                        on:click={() => openProject($projects[currentIndex].url)}
                                        class="flex items-center justify-center gap-2 flex-1 text-center px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm"
                                    >
                                        <i class="fas fa-globe"></i>
                                        <span>Visit</span>
                                    </button>
                                {/if}
                                {#if $projects[currentIndex].github}
                                    <button 
                                        on:click={() => openProject($projects[currentIndex].github)}
                                        class="flex items-center justify-center gap-2 flex-1 text-center px-4 py-2.5 bg-neutral-800 dark:bg-neutral-700 hover:bg-neutral-900 dark:hover:bg-neutral-600 text-white rounded-lg transition-colors text-sm"
                                    >
                                        <i class="fab fa-github"></i>
                                        <span>View Code</span>
                                    </button>
                                {/if}
                            </div>
                        </div>
                    </div>

                    <!-- page index -->
                    <div class="mt-6 mb-0 flex gap-2 items-center justify-center">
                        {#each Array(Math.min($projects.length, 5)) as _, i}
                            <button 
                                class="w-2 h-2 rounded-full transition-all duration-120 {i === currentIndex ? 'bg-white w-4 border border-black dark:border-white' : 'bg-neutral-400'}"
                                on:click={() => currentIndex = i}
                            />
                        {/each}
                        <!-- {#if $projects.length > 5}
                            <span class="text-neutral-400 text-sm"></span>
                        {/if} -->
                    </div>
                {/if}
            </div>
        {:else}
            <div class="p-4 md:p-8">
                <div class="bg-neutral-200 dark:bg-neutral-900/80 rounded-lg shadow-lg overflow-hidden border border-white/20 dark:border-neutral-600/20">
                    <div class="bg-white/80 dark:bg-neutral-700 p-2 flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {#each $projects as project, index}
                            <div 
                                class="group relative cursor-pointer bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div class="relative w-full aspect-video">
                                    {#if imageLoading[index]}
                                        <div class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                                            <LoadingSpinner />
                                        </div>
                                    {/if}
                                    <img 
                                        src={optimizeImage(project.image, { width: 800, format: 'webp' })}
                                        srcset={getResponsiveImageSrcSet(project.image)}
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        alt={project.title}
                                        class="w-full h-full object-cover"
                                        on:load={() => handleImageLoad(index)}
                                        on:loadstart={() => handleImageLoadStart(index)}
                                    />
                                </div>
                                <div class="p-4">
                                    <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{project.title}</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2">{project.description}</p>
                                    <div class="flex flex-wrap gap-2 mt-3">
                                        {#each project.technologies as tech}
                                            <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full text-xs">
                                                {tech}
                                            </span>
                                        {/each}
                                    </div>
                                    <div class="flex gap-3 mt-4">
                                        {#if project.url}
                                            <a 
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="text-sm px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
                                            >
                                                Visit Site
                                            </a>
                                        {/if}
                                        {#if project.github}
                                            <a 
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="text-sm px-3 py-1.5 bg-neutral-800 dark:bg-neutral-600 hover:bg-neutral-900 dark:hover:bg-neutral-500 text-white rounded-md"
                                            >
                                                View Code
                                            </a>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    </div>
{/if}