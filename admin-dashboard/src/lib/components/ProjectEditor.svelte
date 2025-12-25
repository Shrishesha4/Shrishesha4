<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { projects, type Project } from '$lib/stores/projects';
    import { auth } from '$lib/firebase/config';
    import { onMount } from 'svelte';
    import { navigate } from '$lib/router';
    import { toast } from '$lib/stores/toast';
    
    let currentProjects: Project[] = [];
    let loading = true;
    let error = '';

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    navigate('/login', { replace: true });
                    return;
                }
                await projects.load();
                currentProjects = [...$projects];
                loading = false;
            } catch (err) {
                error = 'Failed to load projects data';
                loading = false;
            }
        });

        return () => unsubscribe();
    });

    $: if ($projects) {
        currentProjects = [...$projects];
    }

    function handleAdd() {
        navigate('/projects/new');
    }

    function handleEdit(project: Project) {
        navigate(`/projects/edit/${project.id}`);
    }

    async function handleRemove(project: Project) {
        if (!confirm('Are you sure you want to delete this project?')) return;
        
        try {
            const updatedProjects = currentProjects.filter(p => p.id !== project.id);
            await projects.set(updatedProjects);
            toast.show('Project deleted successfully!', 'success');
        } catch (error) {
            toast.show('Failed to delete project', 'error');
        }
    }
</script>

{#if loading}
    <LoadingSpinner />
{:else if error}
    <div class="text-red-500 text-center p-4">{error}</div>
{:else}
    <div class="space-y-6 pb-20 md:pb-0">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Projects</h1>
                <p class="text-neutral-500 dark:text-neutral-400 text-sm">Manage your portfolio showcase</p>
            </div>
            <button 
                on:click={handleAdd}
                class="glass-button glass-button-primary px-4 py-2 flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
                <i class="fas fa-plus"></i> <span class="hidden sm:inline">New Project</span>
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each currentProjects as project}
                <div class="glass-card group relative overflow-hidden hover:border-orange-500/30 transition-all duration-300">
                    <!-- Image Area -->
                    <div class="aspect-video w-full bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                        {#if project.image}
                            <img src={project.image} alt={project.title} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        {:else}
                            <div class="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-700">
                                <i class="fas fa-image text-4xl"></i>
                            </div>
                        {/if}
                        
                        <!-- Overlay Actions -->
                        <div class="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px] pointer-events-auto sm:pointer-events-none group-hover:pointer-events-auto">
                            <button 
                                on:click={() => handleEdit(project)}
                                class="w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors shadow-lg"
                                title="Edit"
                            >
                                <i class="fas fa-pen"></i>
                            </button>
                            <button 
                                on:click={() => handleRemove(project)}
                                class="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                                title="Delete"
                            >
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-5">
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-1">{project.title}</h3>
                        <p class="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                            {project.description}
                        </p>
                        
                        <div class="flex flex-wrap gap-2">
                            {#each project.technologies.slice(0, 3) as tech}
                                <span class="px-2 py-1 rounded-md bg-neutral-100 dark:bg-white/5 text-xs font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-white/5">
                                    {tech}
                                </span>
                            {/each}
                            {#if project.technologies.length > 3}
                                <span class="px-2 py-1 text-xs text-neutral-400">+{project.technologies.length - 3}</span>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}