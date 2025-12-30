<script lang="ts">
    import { projects } from '$lib/stores/projects';
    import type { Project } from '$lib/types';

    // Sort: featured first
    $: sortedProjects = [...$projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    }).slice(0, 5); // Limit to top 5 to fit on a resume
</script>

{#if sortedProjects.length > 0}
    <section class="mb-6">
        <h3 class="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wider">
            Projects
        </h3>
        <div class="space-y-4">
            {#each sortedProjects as project}
                <div class="break-inside-avoid">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-gray-800 text-sm">{project.title}</h4>
                            {#if project.url || project.github}
                                <div class="flex gap-2 text-xs print:hidden">
                                    {#if project.github}
                                        <a href={project.github} target="_blank" class="text-gray-500 hover:text-black">
                                            <i class="fa-brands fa-github"></i>
                                        </a>
                                    {/if}
                                    {#if project.url}
                                        <a href={project.url} target="_blank" class="text-gray-500 hover:text-black">
                                            <i class="fa-solid fa-external-link"></i>
                                        </a>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    </div>
                    
                    {#if project.resumeSummary && project.resumeSummary.length > 0}
                        <ul class="list-disc list-outside ml-4 mb-2 space-y-1">
                            {#each project.resumeSummary as point}
                                <li class="text-gray-700 text-sm leading-relaxed text-justify">
                                    {point}
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <p class="text-gray-700 text-sm text-justify mb-2 leading-relaxed">
                            {project.description}
                        </p>
                    {/if}

                    {#if project.technologies && project.technologies.length > 0}
                        <div class="flex flex-wrap gap-1">
                            {#each project.technologies as tech}
                                <span class="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200 print:bg-white print:border-gray-300">
                                    {tech}
                                </span>
                            {/each}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </section>
{/if}