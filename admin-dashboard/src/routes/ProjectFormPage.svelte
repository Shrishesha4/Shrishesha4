<script lang="ts">
    import { onMount } from 'svelte';
    import { projects, type Project } from '$lib/stores/projects';
    import { navigate } from '$lib/router';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/firebase/config';
    import ImageUpload from '$lib/components/ImageUpload.svelte';

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
        github: '',
        featured: false
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

<div class="h-screen w-screen overflow-hidden flex flex-col-reverse bg-neutral-100 dark:bg-neutral-950 p-4 gap-4">
    <!-- Bottom Toolbar -->
    <header class="glass-card h-20 px-6 flex items-center justify-between border-neutral-200 dark:border-white/5 shrink-0 shadow-2xl">
        <div class="flex items-center gap-4">
            <button 
                on:click={() => navigate('/?tab=projects')}
                class="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm active:scale-95"
            >
                <i class="fas fa-arrow-left"></i>
            </button>
            <div class="hidden sm:block">
                <h1 class="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                    {isEdit ? 'Edit Project' : 'New Project'}
                </h1>
                <p class="text-xs text-neutral-500">Workspace / Projects</p>
            </div>
        </div>

        <button 
            type="submit"
            form="projectForm"
            class="glass-button glass-button-primary px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-500/30"
        >
            {isEdit ? 'Save Changes' : 'Create Project'}
        </button>
    </header>

    <!-- Main Content -->
    <main class="flex-1 glass-card overflow-hidden flex flex-col border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50">
        {#if loading}
            <div class="flex-1 flex items-center justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
            </div>
        {:else}
            <div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div class="max-w-3xl mx-auto animate-workspace-in">
                    <form id="projectForm" on:submit|preventDefault={handleSubmit} class="space-y-8">
                        <div class="space-y-6">
                            <div>
                                <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Project Identity</label>
                                <input 
                                    type="text" 
                                    bind:value={project.title}
                                    required
                                    class="glass-input w-full text-2xl font-black tracking-tight"
                                    placeholder="Project Name"
                                />
                            </div>

                            <div>
                                <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">The Story</label>
                                <textarea 
                                    bind:value={project.description}
                                    required
                                    class="glass-input w-full"
                                    rows="4"
                                    placeholder="Tell the story of this project..."
                                ></textarea>
                            </div>

                            <div>
                                <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Visual Asset</label>
                                <div class="glass-card p-6 bg-neutral-50/50 dark:bg-white/5 border-neutral-200/50">
                                    <ImageUpload
                                        currentImage={project.image}
                                        onImageUploaded={(url) => project.image = url}
                                    />
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Live Endpoint</label>
                                    <input 
                                        type="url" 
                                        bind:value={project.url}
                                        class="glass-input w-full"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Source Control</label>
                                    <input 
                                        type="url" 
                                        bind:value={project.github}
                                        class="glass-input w-full"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Stack Components</label>
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
                                    placeholder="e.g., Svelte, Node.js..."
                                />
                                <div class="flex flex-wrap gap-2 mt-4">
                                    {#each project.technologies as tech}
                                        <span class="px-4 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-tighter">
                                            {tech}
                                        </span>
                                    {/each}
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Featured Project</label>
                                <div class="glass-card p-4 bg-neutral-50/50 dark:bg-white/5 border-neutral-200/50">
                                    <label class="flex items-center gap-3 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            bind:checked={project.featured}
                                            class="w-5 h-5 rounded border-2 border-neutral-300 dark:border-neutral-600 text-orange-500 focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
                                        />
                                        <span class="text-sm text-neutral-700 dark:text-neutral-300">Show this project in the featured section on the homepage</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        {/if}
    </main>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
    :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); }
</style>