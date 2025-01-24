<script lang="ts">
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import { projects } from '$lib/stores/projects';
    import GithubRepos from '$lib/components/GithubRepos.svelte';
    import LoadingSpinner from './LoadingSpinner.svelte';
    let isMobile = false;
    let currentIndex = 0;
    let startX: number;
    let deltaX = spring(0);
    let loading = true;

    onMount(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        loading = false;
        return () => window.removeEventListener('resize', checkMobile);
    });

    function checkMobile() {
        isMobile = window.innerWidth < 768;
    }

    function handleTouchStart(e: TouchEvent) {
        if (!isMobile) return;
        startX = e.touches[0].clientX;
    }

    function handleTouchMove(e: TouchEvent) {
        if (!isMobile || startX === undefined) return;
        const currentX = e.touches[0].clientX;
        deltaX.set(currentX - startX);
    }

    function handleTouchEnd() {
        if (!isMobile || startX === undefined) return;
        if ($deltaX < -100 && currentIndex < $projects.length - 1) {
            currentIndex++;
        } else if ($deltaX > 100 && currentIndex > 0) {
            currentIndex--;
        }
        deltaX.set(0);
        startX = 0;
    }

    function openProject(url?: string) {
        if (url) {
            window.open(url, '_blank');
        }
    }
</script>
{#if loading}
    <LoadingSpinner />
{:else}
    <div class="min-h-screen">
        {#if isMobile}
            <div 
                class="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative"
                on:touchstart={handleTouchStart}
                on:touchmove={handleTouchMove}
                on:touchend={handleTouchEnd}
            >
                {#if $projects[currentIndex]}
                    // For mobile view
                    <div 
                        class="w-[90vw] h-[50vh] bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-lg transition-transform"
                        style="transform: translateX({$deltaX}px) rotate({$deltaX * 0.1}deg)"
                    >
                        <img 
                            src={$projects[currentIndex].image} 
                            alt={$projects[currentIndex].title}
                            class="w-full h-32 object-cover rounded-t-xl"
                        />
                        <div class="p-4">
                            <h2 class="text-xl font-bold text-neutral-900 dark:text-neutral-100">{$projects[currentIndex].title}</h2>
                            <p class="text-neutral-600 dark:text-neutral-400 mt-2">{$projects[currentIndex].description}</p>
                            <div class="flex flex-wrap gap-2 mt-4">
                                {#each $projects[currentIndex].technologies as tech}
                                    <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full text-sm">
                                        {tech}
                                    </span>
                                {/each}
                            </div>
                            <div class="flex gap-3 mt-4">
                                {#if $projects[currentIndex].url}
                                    <button 
                                        on:click={() => openProject($projects[currentIndex].url)}
                                        class="text-sm px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
                                    >
                                        <i class="fas fa-external-link-alt me-2"></i>Visit Site
                                    </button>
                                {/if}
                                {#if $projects[currentIndex].github}
                                    <button 
                                        on:click={() => openProject($projects[currentIndex].github)}
                                        class="text-sm px-4 py-2 bg-neutral-800 dark:bg-neutral-700 hover:bg-neutral-900 dark:hover:bg-neutral-600 text-white rounded-md"
                                    >
                                        <i class="fab fa-github me-2"></i>View Code
                                    </button>
                                {/if}
                            </div>
                        </div>
                    </div>
                    
                    // For desktop view
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {#each $projects as project}
                            <div 
                                class="group relative cursor-pointer bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-220px]"
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    class="w-full h-32 object-cover"
                                />
                                <div class="p-4 flex flex-col h-[calc(100%-8rem)]">
                                    <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{project.title}</h3>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2">{project.description}</p>
                                    <div class="flex flex-wrap gap-2 mt-3">
                                        {#each project.technologies as tech}
                                            <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full text-xs">
                                                {tech}
                                            </span>
                                        {/each}
                                    </div>
                                    <div class="flex gap-3 mt-auto">
                                        {#if project.url}
                                            <a 
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="text-sm px-3 py-1.5 bg-neutral-800 dark:bg-neutral-600 hover:bg-neutral-900 dark:hover:bg-neutral-500 text-white rounded-md"
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
                {/if}
            </div>
        {:else}
            <div class="p-4 md:p-8">
                <div class="bg-neutral-50 dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
                    <div class="bg-neutral-200 dark:bg-neutral-700 p-2 flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {#each $projects as project}
                            <div 
                                class="group relative cursor-pointer bg-neutral-100 dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    class="w-full aspect-video object-cover"
                                />
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
        <GithubRepos />
    </div>
{/if}