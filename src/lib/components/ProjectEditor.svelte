<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { projects, type Project } from '$lib/stores/projects';
    import { auth } from '$lib/firebase/config';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { toast } from '$lib/stores/toast';
    import ProjectModal from './ProjectModal.svelte';
    import { slide } from 'svelte/transition';
	import ImageUpload from './ImageUpload.svelte';
    
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

    let draggedIndex: number | null = null;
    let dragOverIndex: number | null = null;
    let touchStartY: number | null = null;
    let currentTouchY: number | null = null;

    function handleTouchStart(e: TouchEvent, index: number) {
        draggedIndex = index;
        touchStartY = e.touches[0].clientY;
        const target = e.currentTarget as HTMLElement;
        target.classList.add('dragging');
    }

    function handleTouchMove(e: TouchEvent) {
        e.preventDefault();
        if (draggedIndex === null || touchStartY === null) return;
        
        currentTouchY = e.touches[0].clientY;
        const elements = document.querySelectorAll('.project-card');
        
        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            if (currentTouchY && currentTouchY >= rect.top && currentTouchY <= rect.bottom) {
                dragOverIndex = index;
            }
        });
    }

    function handleTouchEnd(e: TouchEvent) {
        if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
            const projects = [...currentProjects];
            const [movedProject] = projects.splice(draggedIndex, 1);
            projects.splice(dragOverIndex, 0, movedProject);
            currentProjects = projects;
            saveProjects();
        }
        
        const target = e.currentTarget as HTMLElement;
        target.classList.remove('dragging');
        draggedIndex = null;
        dragOverIndex = null;
        touchStartY = null;
        currentTouchY = null;
    }

    function handleDragStart(e: DragEvent, index: number) {
        draggedIndex = index;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
        }
    }

    function handleDragOver(e: DragEvent, index: number) {
        e.preventDefault();
        dragOverIndex = index;
    }

    function handleDrop(e: DragEvent, index: number) {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index) {
            const projects = [...currentProjects];
            const [movedProject] = projects.splice(draggedIndex, 1);
            projects.splice(index, 0, movedProject);
            currentProjects = projects;
            saveProjects();
        }
        draggedIndex = null;
        dragOverIndex = null;
    }
    
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
                    class="bg-primary-600 text-black dark:text-white px-4 py-2 rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800"
                >
                    <i class="fas fa-plus me-2"></i>
                </button>
            </div>

            <div class="space-y-6">
                {#each currentProjects as project, i}
                    <div 
                        class="project-card glass-card px-4 py-4 rounded-xl p-4 rounded-lg shadow hover:glass-card-hover md:hover:glass-card-hover {dragOverIndex === i ? 'border-2 border-primary-500' : ''}"
                        draggable="true"
                        on:dragstart={(e) => handleDragStart(e, i)}
                        on:dragover={(e) => handleDragOver(e, i)}
                        on:drop={(e) => handleDrop(e, i)}
                        on:touchstart={(e) => handleTouchStart(e, i)}
                        on:touchmove|preventDefault={handleTouchMove}
                        on:touchend={handleTouchEnd}
                    >
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-4">
                                <i class="fas fa-grip-vertical cursor-move text-neutral-500 mt-1"></i>
                                <div class="flex items-center gap-2 cursor-pointer" on:click={() => toggleProject(i)}>
                                    <i class="fas fa-chevron-{expandedProjects.has(i) ? 'down' : 'right'} text-neutral-500"></i>
                                    <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                        {project.title || `Project ${i + 1}`}
                                    </h2>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                {#if isProjectModified(project, i)}
                                    <button 
                                        on:click={() => saveProject(project, i)}
                                        class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-2"
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
                                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Description</label>
                                        <textarea 
                                            bind:value={project.description}
                                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Project Image</label>
                                        <ImageUpload
                                            currentImage={project.image}
                                            onImageUploaded={(url) => project.image = url}
                                        />
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Project URL</label>
                                        <input 
                                            type="url" 
                                            bind:value={project.url}
                                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">GitHub URL</label>
                                        <input 
                                            type="url" 
                                            bind:value={project.github}
                                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-neutral-700 dark:text-neutral-300">Technologies (comma-separated)</label>
                                        <input 
                                            type="text" 
                                            bind:value={project.technologies}
                                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
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