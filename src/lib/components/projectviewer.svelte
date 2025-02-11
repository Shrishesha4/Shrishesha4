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
        const distance = Math.abs(currentX - startX);
        deltaX.set(currentX - startX);
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
</script>
<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore element_invalid_self_closing_tag -->
 <!-- svelte-ignore a11y_click_events_have_key_events -->
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
                        class="w-[85vw] h-auto min-h-[50vh] glass-card glass-card-hover rounded-2xl"
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
                                class="w-full h-full object-cover rounded-2xl"
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
                                    <span class="glass-button bg-primary-100/30 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                                        {tech}
                                    </span>
                                {/each}
                            </div>
                            <div class="flex gap-3 mt-6">
                                {#if $projects[currentIndex].url}
                                    <button 
                                        on:click={() => openProject($projects[currentIndex].url)}
                                        class="glass-button flex items-center justify-center gap-2 flex-1 text-center px-4 py-2.5 text-black dark:text-white rounded-lg transition-all duration-200 backdrop-blur-sm"
                                    >
                                        <i class="fas fa-globe"></i>
                                        <span>Visit</span>
                                    </button>
                                {/if}
                                {#if $projects[currentIndex].github}
                                    <button 
                                        on:click={() => openProject($projects[currentIndex].github)}
                                        class="glass-button flex items-center justify-center gap-2 flex-1 text-center px-4 py-2.5 text-black dark:text-white rounded-lg transition-all duration-200 backdrop-blur-sm"
                                    >
                                        <i class="fab fa-github"></i>
                                        <span>View Repo</span>
                                    </button>
                                {/if}
                            </div>
                        </div>
                    </div>

                    <!-- Navigation and Page Indicator -->
                    <div class="flex items-center justify-center gap-4 mt-6">
                        <!-- Left Button -->
                        {#if currentIndex > 0}
                            <button
                                class="glass-button w-8 h-8 flex items-center justify-center hover:scale-105 dark:hover:scale-105 rounded-full text-black/90 dark:text-white transition-all duration-200"
                                on:click={() => {
                                    opacity.set(0.7);
                                    scale.set(0.95);
                                    deltaX.set(window.innerWidth / 2);
                                    setTimeout(() => {
                                        currentIndex--;
                                        deltaX.set(0);
                                        opacity.set(1);
                                        scale.set(1);
                                    }, 150);
                                }}
                            >
                                <i class="fas fa-chevron-left text-sm"></i>
                            </button>
                        {/if}

                        <!-- Page Indicator -->
                        <div class="flex gap-2">
                            {#each Array(Math.min($projects.length, 5)) as _, i}
                                <div 
                                    class="w-2 h-2 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-white w-4 border border-black dark:border-white' : 'bg-white dark:bg-neutral-700'}"
                                    on:click={() => currentIndex = i}
                                    role="button"
                                    tabindex="0"
                                ></div>
                            {/each}
                        </div>

                        <!-- Right Button -->
                        {#if currentIndex < $projects.length - 1}
                            <button
                                class="glass-button w-8 h-8 flex items-center justify-center hover:scale-105 dark:hover:scale-105 rounded-full text-black/90 dark:text-white transition-all duration-200"
                                on:click={() => {
                                    opacity.set(0.7);
                                    scale.set(0.95);
                                    deltaX.set(-window.innerWidth / 2);
                                    setTimeout(() => {
                                        currentIndex++;
                                        deltaX.set(0);
                                        opacity.set(1);
                                        scale.set(1);
                                    }, 150);
                                }}
                            >
                                <i class="fas fa-chevron-right text-sm"></i>
                            </button>
                        {/if}
                    </div>
                {/if}
            </div>
        {:else}
            <div class="p-4 md:p-8">
                <div class="glass-card overflow-hidden">
                    <div class="bg-white/20 dark:bg-black/30 backdrop-blur-sm p-2 flex items-center">
                        <div class="flex space-x-2">
                            <button class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-150"></button>
                            <button class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-150"></button>
                            <button class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-150"></button>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {#each $projects as project, index}
                            <div class="glass-card glass-card-hover group relative cursor-pointer">
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
                                                class="glass-button text-sm px-3 py-1.5 hover:bg-neutral-900 dark:hover:bg-neutral-500 text-black dark:text-white hover:text-white rounded-md"
                                            >
                                            <i class="fas fa-globe"></i>
                                                Visit
                                            </a>
                                        {/if}
                                        {#if project.github}
                                            <a 
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="glass-button text-sm px-3 py-1.5 hover:bg-neutral-900 dark:hover:bg-neutral-500 text-black dark:text-white hover:text-white rounded-md"
                                            >
                                                <i class="fab fa-github"></i>
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