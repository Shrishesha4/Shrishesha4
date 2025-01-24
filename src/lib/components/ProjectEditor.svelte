<script lang="ts">
    import { projects, type Project } from '$lib/stores/projects';
    import { onMount } from 'svelte';

    let currentProjects: Project[] = [];
    
    onMount(() => {
        currentProjects = [...$projects];
    });

    function addProject() {
        currentProjects = [...currentProjects, {
            id: crypto.randomUUID(),
            title: '',
            description: '',
            image: '',
            technologies: []
        }];
    }

    function removeProject(index: number) {
        currentProjects = currentProjects.filter((_, i) => i !== index);
    }

    async function saveProjects() {
        try {
            projects.set(currentProjects);
            alert('Projects saved successfully!');
        } catch (error) {
            alert('Failed to save projects');
        }
    }
</script>

<div class="min-h-screen p-4 bg-neutral-50 dark:bg-neutral-900">
    <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Edit Projects</h1>
            <button 
                on:click={addProject}
                class="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
            >
                <i class="fas fa-plus me-2"></i>Add Project
            </button>
        </div>

        <div class="space-y-6">
            {#each currentProjects as project, i}
                <div class="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Project {i + 1}</h2>
                        <button 
                            on:click={() => removeProject(i)}
                            class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                        >
                            <i class="fas fa-trash me-2"></i>Remove
                        </button>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Title</label>
                            <input 
                                type="text" 
                                bind:value={project.title}
                                class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        <div>
                            <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Description</label>
                            <textarea 
                                bind:value={project.description}
                                class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                rows="3"
                            ></textarea>
                        </div>

                        <div>
                            <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Image URL</label>
                            <input 
                                type="text" 
                                bind:value={project.image}
                                class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        <div>
                            <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Technologies (comma-separated)</label>
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
                                class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="mt-6">
            <button 
                on:click={saveProjects}
                class="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white px-4 py-2 rounded transition-colors duration-200"
            >
                Save All Changes
            </button>
        </div>
    </div>
</div>

<!--  -->