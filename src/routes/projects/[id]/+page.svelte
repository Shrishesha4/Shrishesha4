<script lang="ts">
    import { projects } from '$lib/stores/projects';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import { optimizeImage, getResponsiveImageSrcSet } from '$lib/utils/imageOptimizer';

    let currentProject: typeof $projects[0] | undefined;
    let loading = true;

    onMount(async () => {
        try {
            // Ensure projects are loaded
            if ($projects.length === 0) {
                await projects.load();
            }
            currentProject = $projects.find(p => p.id === $page.params.id);
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <div class="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
    </div>
{:else if currentProject}
    <div class="min-h-screen p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
            <!-- Back Button -->
            <div class="mb-8">
                <a href="/projects" class="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    <i class="fas fa-chevron-left mr-2"></i>
                    Back to Projects
                </a>
            </div>

            <!-- Header -->
            <header class="mb-8">
                <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight text-neutral-900 dark:text-white">
                    {currentProject.title}
                </h1>
                
                <!-- Technologies -->
                <div class="flex flex-wrap gap-2 mb-6">
                    {#each currentProject.technologies as tech}
                        <span class="px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                            {tech}
                        </span>
                    {/each}
                </div>
            </header>

            <!-- Main Image -->
            {#if currentProject.image}
                <div class="w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl mb-10 shadow-2xl bg-neutral-100 dark:bg-neutral-900 relative group">
                    <img 
                        src={optimizeImage(currentProject.image, { width: 1200, format: 'webp' })}
                        srcset={getResponsiveImageSrcSet(currentProject.image)}
                        alt={currentProject.title}
                        class="w-full h-full object-cover"
                    />
                </div>
            {/if}

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4 mb-10">
                {#if currentProject.url}
                    <a 
                        href={currentProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                {/if}
                
                {#if currentProject.github}
                    <a 
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl border border-neutral-200 dark:border-neutral-700"
                    >
                        <i class="fab fa-github"></i>
                        <span>View Code</span>
                    </a>
                {/if}
            </div>

            <!-- Description -->
            <div class="prose dark:prose-invert max-w-none prose-lg">
                <h3 class="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">About the Project</h3>
                <p class="whitespace-pre-line text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {currentProject.description}
                </p>
            </div>
        </div>
    </div>
{:else}
    <div class="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <i class="fas fa-folder-open text-6xl text-neutral-300 dark:text-neutral-700 mb-4"></i>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Project not found</h2>
        <p class="text-neutral-500 dark:text-neutral-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <a href="/projects" class="px-6 py-2 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
            Browse Projects
        </a>
    </div>
{/if}
