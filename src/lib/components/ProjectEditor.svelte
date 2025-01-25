<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { projects, type Project } from '$lib/stores/projects';
    import { auth } from '$lib/firebase/config';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { toast } from '$lib/stores/toast';
    import ProjectModal from './ProjectModal.svelte';

    let currentProjects: Project[] = [];
    let loading = true;
    let error = '';
    let showModal = false;
    let originalProjects: string = ''; // Track original state

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    goto('/admin/login');
                    return;
                }
                await projects.load();
                currentProjects = [...$projects];
                originalProjects = JSON.stringify(currentProjects);
                loading = false;
            } catch (err) {
                error = 'Failed to load projects data';
                loading = false;
            }
        });

        return () => unsubscribe();
    });

    // Function to check if project is modified
    function isProjectModified(project: Project, index: number): boolean {
        const originalProject = JSON.parse(originalProjects)[index];
        return JSON.stringify(project) !== JSON.stringify(originalProject);
    }

    // Subscribe to projects store changes
    $: {
        if ($projects) {
            currentProjects = [...$projects];
        }
    }

    function addProject() {
        showModal = true;
        currentProjects = [...currentProjects, {
            id: crypto.randomUUID(),
            title: '',
            description: '',
            image: '',
            technologies: [],
            url: '',
            github: ''
        }];
    }

    function removeProject(index: number) {
        currentProjects = currentProjects.filter((_, i) => i !== index);
    }

    async function saveProjects() {
        try {
            if (!auth.currentUser) {
                throw new Error('Not authenticated');
            }
            await projects.set(currentProjects);
            toast.show('Projects saved successfully!', 'success');
        } catch (error) {
            toast.show('Failed to save projects', 'error');
        }
    }

    async function saveProject(project: Project, index: number) {
        try {
            const updatedProjects = [...currentProjects];
            updatedProjects[index] = project;
            await projects.set(updatedProjects);
            originalProjects = JSON.stringify(updatedProjects);
            toast.show('Project saved successfully!', 'success');
        } catch (error) {
            toast.show('Failed to save project', 'error');
        }
    }
</script>

<ProjectModal 
    bind:show={showModal} 
    on:save={(event) => {
        currentProjects = [...currentProjects, event.detail];
        saveProjects();
    }}
/>

{#if loading}
    <LoadingSpinner />
{:else if error}
    <div class="text-red-500 text-center p-4">{error}</div>
{:else}
    <div class="min-h-screen p-4 bg-neutral-50 dark:bg-neutral-900">
        <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Edit Projects</h1>
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button 
                    on:click={addProject}
                    class="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                >
                    <i class="fas fa-plus me-2"></i>
                </button>
            </div>

            <div class="space-y-6">
                {#each currentProjects as project, i}
                    <div class="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow">
                        <div class="flex justify-between items-start mb-4">
                            <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Project {i + 1}</h2>
                            <div class="flex gap-2">
                                {#if isProjectModified(project, i)}
                                    <!-- svelte-ignore a11y_consider_explicit_label -->
                                    <button 
                                        on:click={() => saveProject(project, i)}
                                        class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-5"
                                        title="Save changes"
                                    >
                                        <i class="fas fa-save"></i>
                                    </button>
                                {/if}
                                <!-- svelte-ignore a11y_consider_explicit_label -->
                                <button 
                                    on:click={() => removeProject(i)}
                                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                    title="Delete project"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Title</label>
                                <input 
                                    type="text" 
                                    bind:value={project.title}
                                    class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>

                            <div>
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Description</label>
                                <textarea 
                                    bind:value={project.description}
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
                                    class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>

                            <div>
                                <!-- svelte-ignore a11y_label_has_associated_control -->
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

            <div class="mt-6 flex justify-center">
                <button 
                    on:click={saveProjects}
                    class="border border-neutral-300 dark:border-neutral-600 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
{/if}