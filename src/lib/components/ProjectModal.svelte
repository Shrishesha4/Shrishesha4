<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Project } from '$lib/stores/projects';

    export let show = false;
    
    const dispatch = createEventDispatcher();
    let project: Project = {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        image: '',
        technologies: [],
        url: '',
        github: ''
    };

    function handleSubmit() {
        dispatch('save', project);
        show = false;
        // Reset form
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

    function handleClose() {
        show = false;
    }
</script>

{#if show}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-lg">
            <div class="p-6">
                <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Add New Project</h2>
                <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Title</label>
                        <input 
                            type="text" 
                            bind:value={project.title}
                            required
                            class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Description</label>
                        <textarea 
                            bind:value={project.description}
                            required
                            class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                            rows="3"
                        ></textarea>
                    </div>

                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Image URL</label>
                        <input 
                            type="text" 
                            bind:value={project.image}
                            required
                            class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Technologies (comma-separated)</label>
                        <input 
                            type="text" 
                            on:input={(e) => {
                                if (e.target) {
                                    project.technologies = (e.target as HTMLInputElement).value
                                        .split(',')
                                        .map(t => t.trim())
                                        .filter(Boolean);
                                }
                            }}
                            class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button 
                            type="button"
                            on:click={handleClose}
                            class="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            class="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded"
                        >
                            Add Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
{/if}