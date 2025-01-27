<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { projects, type Project } from '$lib/stores/projects';
    import { auth } from '$lib/firebase/config';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { toast } from '$lib/stores/toast';
    import ProjectModal from './ProjectModal.svelte';
    import { slide } from 'svelte/transition';
    
    let currentProjects: Project[] = [];
    let loading = true;
    let error = '';
    let showModal = false;
    let originalProjects: string = '';
    let isSaving = false;

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

    function isProjectModified(project: Project, index: number): boolean {
        const originalProject = JSON.parse(originalProjects)[index];
        return JSON.stringify(project) !== JSON.stringify(originalProject);
    }

    $: {
        if ($projects) {
            currentProjects = [...$projects];
        }
    }

    function addProject() {
        showModal = true;
    }

    function removeProject(index: number) {
        currentProjects = currentProjects.filter((_, i) => i !== index);
    }
    
    async function saveProjects() {
        try {
            if (!auth.currentUser) {
                throw new Error('Not authenticated');
            }
            isSaving = true;
            await projects.set(currentProjects);
            originalProjects = JSON.stringify(currentProjects);
            toast.show('Projects saved successfully!', 'success');
        } catch (error) {
            toast.show('Failed to save projects', 'error');
        } finally {
            isSaving = false;
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

    function hasUnsavedChanges(): boolean {
        return currentProjects.some((project, index) => isProjectModified(project, index)) || 
               currentProjects.length !== JSON.parse(originalProjects).length;
    }
    // Initialize with empty set instead of Set([0])
    let expandedProjects: Set<number> = new Set();

    function toggleProject(index: number) {
        if (expandedProjects.has(index)) {
            expandedProjects.delete(index);
        } else {
            expandedProjects.add(index);
        }
        expandedProjects = expandedProjects;
    }
</script>

<ProjectModal 
    bind:show={showModal} 
    on:save={(event) => {
        currentProjects = [...currentProjects, event.detail];
        saveProjects();
    }}
/>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_label_has_associated_control -->
<!-- svelte-ignore a11y_missing_content -->
{#if loading}
    <LoadingSpinner />
{:else if error}
    <div class="text-red-500 text-center p-4">{error}</div>
{:else}
    <div class="min-h-screen p-4 ">
        <div class="max-w-4xl mx-auto ">
            <div class="flex justify-between items-center mb-6 ">
                <h1 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 "></h1>
                <button 
                    on:click={addProject}
                    class="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                >
                    <i class="fas fa-plus me-2"></i>
                </button>
            </div>
            {#if hasUnsavedChanges() && !isSaving}
                <div class="flex justify-end mb-4">
                    <button 
                        on:click={saveProjects}
                        class="bg-primary-800 dark:bg-primary-100 text-primary-800 dark:text-white border px-4 py-2 rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 transition-colors duration-200 flex items-center"
                    >
                        <i class="fas fa-save mr-2"></i>
                        Save Changes
                    </button>
                </div>
            {/if}

            <div class="space-y-6">
                {#each currentProjects as project, i}
                    <div class="bg-neutral-200 dark:bg-neutral-800 px-4 py-4 rounded-xl p-4 rounded-lg shadow">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-4 cursor-pointer" on:click={() => toggleProject(i)}>
                                <i class="fas fa-chevron-{expandedProjects.has(i) ? 'down' : 'right'} text-neutral-500"></i>
                                <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                    {project.title || `Project ${i + 1}`}
                                </h2>
                            </div>
                            <div class="flex gap-2">
                                {#if isProjectModified(project, i)}
                                    <button 
                                        on:click={() => saveProject(project, i)}
                                        class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-5"
                                        title="Save changes"
                                    >
                                        <i class="fas fa-save"></i>
                                    </button>
                                {/if}
                                <button 
                                    on:click={() => removeProject(i)}
                                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                    title="Delete project"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                
                        {#if expandedProjects.has(i)}
                            <div class="space-y-4" transition:slide>
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
                                            type="url" 
                                            bind:value={project.image}
                                            class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Project URL</label>
                                        <input 
                                            type="url" 
                                            bind:value={project.url}
                                            class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">GitHub URL</label>
                                        <input 
                                            type="url" 
                                            bind:value={project.github}
                                            class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Technologies (comma-separated)</label>
                                        <input 
                                            type="text" 
                                            bind:value={project.technologies}
                                            class="w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="React, TypeScript, Node.js"
                                        />
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}