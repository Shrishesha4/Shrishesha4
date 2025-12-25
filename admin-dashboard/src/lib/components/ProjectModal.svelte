<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Project } from '$lib/stores/projects';
	import ImageUpload from './ImageUpload.svelte';

    export let show = false;
    export let projectData: Project | null = null;
    
    const dispatch = createEventDispatcher();
    
    let project: Project = {
        id: '',
        title: '',
        description: '',
        image: '',
        technologies: [],
        url: '',
        github: ''
    };

    $: if (show) {
        if (projectData) {
            // Clone to avoid mutating original until saved
            project = JSON.parse(JSON.stringify(projectData));
        } else {
            // Reset for new project
            project = {
                id: crypto.randomUUID(),
                title: '',
                description: '',
                image: '',
                technologies: [],
                url: '',
                github: ''
            };
        }
    }

    function handleSubmit() {
        dispatch('save', project);
        show = false;
    }

    function handleClose() {
        show = false;
        dispatch('close');
    }
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<!-- svelte-ignore a11y_consider_explicit_label -->
{#if show}
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all duration-300">
        <div class="glass-card w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-workspace-in border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-2xl">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-neutral-200 dark:border-white/10 flex justify-between items-center bg-neutral-50 dark:bg-white/5">
                <h2 class="text-xl font-bold text-neutral-900 dark:text-white">
                    {projectData ? 'Edit Project' : 'New Project'}
                </h2>
                <button on:click={handleClose} class="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                    <i class="fas fa-times text-lg"></i>
                </button>
            </div>

            <!-- Scrollable Body -->
            <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
                <form id="projectForm" on:submit|preventDefault={handleSubmit} class="space-y-5">
                    
                    <div>
                        <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Title</label>
                        <input 
                            type="text" 
                            bind:value={project.title}
                            required
                            class="glass-input w-full"
                            placeholder="Project Name"
                        />
                    </div>

                    <div>
                        <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Description</label>
                        <textarea 
                            bind:value={project.description}
                            required
                            class="glass-input w-full"
                            rows="4"
                            placeholder="Brief description of the project..."
                        ></textarea>
                    </div>

                    <div>
                        <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Thumbnail</label>
                        <ImageUpload
                            currentImage={project.image}
                            onImageUploaded={(url) => project.image = url}
                        />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Live URL</label>
                            <input 
                                type="url" 
                                bind:value={project.url}
                                class="glass-input w-full"
                                placeholder="https://"
                            />
                        </div>

                        <div>
                            <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">GitHub Repo</label>
                            <input 
                                type="url" 
                                bind:value={project.github}
                                class="glass-input w-full"
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Technologies</label>
                        <input 
                            type="text" 
                            value={project.technologies.join(', ')}
                            on:input={(e) => {
                                if (e.target) {
                                    project.technologies = (e.target as HTMLInputElement).value
                                        .split(',')
                                        .map(t => t.trim())
                                        .filter(Boolean);
                                }
                            }}
                            class="glass-input w-full"
                            placeholder="Svelte, TypeScript, Tailwind..."
                        />
                        <p class="text-xs text-neutral-500 mt-1">Comma separated values</p>
                    </div>
                </form>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 flex justify-end gap-3">
                <button 
                    type="button"
                    on:click={handleClose}
                    class="px-5 py-2.5 rounded-xl font-medium text-neutral-600 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-white/10 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    form="projectForm"
                    class="px-5 py-2.5 rounded-xl font-medium glass-button-primary shadow-lg shadow-orange-500/20"
                >
                    {projectData ? 'Save Changes' : 'Create Project'}
                </button>
            </div>
        </div>
    </div>
{/if}
