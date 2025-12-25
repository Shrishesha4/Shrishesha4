<script lang="ts">
    import { onMount } from 'svelte';
    import { projects, type Project } from '$lib/stores/projects';
    import { navigate } from '$lib/router';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/firebase/config';
    import ImageUpload from '$lib/components/ImageUpload.svelte';

    // Parse ID from URL manually since our router is simple
    // Expected URL: /projects/edit/:id or /projects/new
    const path = window.location.pathname;
    const isEdit = path.includes('/edit/');
    const id = isEdit ? path.split('/edit/')[1] : null;

    let project: Project = {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        image: '',
        technologies: [],
        url: '',
        github: ''
    };
    let loading = true;

    onMount(async () => {
        if (!auth.currentUser) {
            navigate('/login');
            return;
        }

        if (isEdit && id) {
            await projects.load();
            const found = $projects.find(p => p.id === id);
            if (found) {
                // Clone to avoid mutating store directly
                project = JSON.parse(JSON.stringify(found));
            } else {
                toast.show('Project not found', 'error');
                navigate('/');
            }
        }
        loading = false;
    });

    async function handleSubmit() {
        try {
            let currentProjects = $projects;
            if (currentProjects.length === 0) {
                // Ensure loaded if adding new and store empty
                await projects.load();
                currentProjects = $projects;
            }

            let updatedProjects = [...currentProjects];
            
            if (isEdit) {
                const index = updatedProjects.findIndex(p => p.id === project.id);
                if (index !== -1) {
                    updatedProjects[index] = project;
                }
            } else {
                updatedProjects.push(project);
            }

            await projects.set(updatedProjects);
            toast.show(`Project ${isEdit ? 'updated' : 'created'} successfully!`, 'success');
            navigate('/?tab=projects');
        } catch (error) {
            console.error(error);
            toast.show('Failed to save project', 'error');
        }
    }
</script>

<div class="min-h-screen bg-neutral-100 dark:bg-neutral-950 p-4 md:p-8">
    <div class="max-w-3xl mx-auto space-y-6 animate-workspace-in">
        <!-- Header -->
        <div class="flex items-center gap-4">
            <button 
                on:click={() => navigate('/?tab=projects')}
                class="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-sm border border-neutral-200 dark:border-white/5"
            >
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
                {isEdit ? 'Edit Project' : 'New Project'}
            </h1>
        </div>

        {#if loading}
            <div class="glass-card p-12 flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
            </div>
        {:else}
            <div class="glass-card p-6 md:p-8 border border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50">
                <form id="projectForm" on:submit|preventDefault={handleSubmit} class="space-y-6">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Project Title</label>
                            <input 
                                type="text" 
                                bind:value={project.title}
                                required
                                class="glass-input w-full text-lg"
                                placeholder="e.g., Portfolio Website"
                            />
                        </div>

                        <div class="md:col-span-2">
                            <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Description</label>
                            <textarea 
                                bind:value={project.description}
                                required
                                class="glass-input w-full"
                                rows="4"
                                placeholder="Describe the project goals and features..."
                            ></textarea>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Project Thumbnail</label>
                            <div class="bg-neutral-100 dark:bg-black/20 rounded-2xl p-4 border border-dashed border-neutral-300 dark:border-white/10">
                                <ImageUpload
                                    currentImage={project.image}
                                    onImageUploaded={(url) => project.image = url}
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Live URL</label>
                            <div class="relative">
                                <span class="absolute left-4 top-3 text-neutral-400"><i class="fas fa-globe"></i></span>
                                <input 
                                    type="url" 
                                    bind:value={project.url}
                                    class="glass-input w-full pl-10"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">GitHub Repository</label>
                            <div class="relative">
                                <span class="absolute left-4 top-3 text-neutral-400"><i class="fab fa-github"></i></span>
                                <input 
                                    type="url" 
                                    bind:value={project.github}
                                    class="glass-input w-full pl-10"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Technologies</label>
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
                                placeholder="Svelte, TypeScript, Tailwind CSS..."
                            />
                            <div class="flex flex-wrap gap-2 mt-3">
                                {#each project.technologies as tech}
                                    <span class="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-200 dark:border-orange-500/20">
                                        {tech}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <div class="pt-6 border-t border-neutral-200 dark:border-white/10 flex justify-end gap-4">
                        <button 
                            type="button"
                            on:click={() => navigate('/?tab=projects')}
                            class="px-6 py-3 rounded-xl font-bold text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            class="px-8 py-3 rounded-xl font-bold glass-button-primary shadow-xl shadow-orange-500/20"
                        >
                            {isEdit ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        {/if}
    </div>
</div>
