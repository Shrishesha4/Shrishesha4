<script lang="ts">
    import type { Project } from '$lib/types';
    import { optimizeImage, getResponsiveImageSrcSet } from '$lib/utils/imageOptimizer';
    
    export let projects: Project[] = [];
    export let error: string = '';
    export let onRetry: () => void;
    let imageLoading: { [key: string]: boolean } = {};

    function handleImageLoad(projectId: string) {
        imageLoading[projectId] = false;
    }

    function handleImageLoadStart(projectId: string) {
        imageLoading[projectId] = true;
    }
</script>

<div >
    <h2 class="mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100">Featured Projects</h2>
    {#if error}
        <div class="mb-8 rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400">
            {error}
            <button class="ml-4 text-sm underline" on:click={onRetry}>
                Try again
            </button>
        </div>
    {:else if projects.length > 0}
        <div class="grid gap-6 md:grid-cols-2 ">
            {#each projects.slice(0, 4) as project}
                <div class="glass-card glass-card-hover p-6">
                    {#if project.image}
                    <img 
                        src={optimizeImage(project.image, { width: 800, format: 'webp' })}
                        srcset={getResponsiveImageSrcSet(project.image)}
                        sizes="(max-width: 480px) 100vw,
                               (max-width: 768px) 50vw,
                               (max-width: 1024px) 33vw,
                               800px"
                        alt={project.title}
                        class="w-full h-40 md:h-48 lg:h-56 xl:h-64 object-cover rounded-lg"
                        loading="lazy"
                        on:load={() => handleImageLoad(project.id)}
                        on:loadstart={() => handleImageLoadStart(project.id)}
                    />
                    {/if}
                    <h3 class="mb-2 mt-3 text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        {project.title}
                    </h3>
                    <p class="mb-4 line-clamp-2 text-neutral-600 dark:text-neutral-300">
                        {project.description}
                    </p>
                    <div class="flex flex-col gap-4">
                        {#if project.technologies && project.technologies.length > 0}
                            <div class="flex flex-wrap gap-2">
                                {#each project.technologies as tech}
                                    <span class="glass-button rounded-full bg-neutral-300/30 dark:bg-neutral-700/30 px-2 py-1 text-xs backdrop-blur-sm">
                                        {tech}
                                    </span>
                                {/each}
                            </div>
                        {/if}
                        <div class="flex gap-2">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="glass-button block rounded-md bg-neutral-800/90 px-4 py-2 text-center text-sm text-white transition-all duration-200 hover:bg-neutral-700/90 dark:hover:bg-neutral-500/90 backdrop-blur-sm"
                            >
                                <i class="fab fa-github mr-1"></i>
                                GitHub
                            </a>
                            {#if project.url}
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="glass-button block rounded-md bg-neutral-800/90 px-4 py-2 text-center text-sm text-white transition-all duration-200 hover:bg-neutral-700/90 dark:hover:bg-neutral-500/90 backdrop-blur-sm"
                            >
                                <i class="fas fa-globe mr-1"></i>
                                Visit
                            </a>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-center text-neutral-600 dark:text-neutral-400">
            No projects available yet.
        </p>
    {/if}
</div>