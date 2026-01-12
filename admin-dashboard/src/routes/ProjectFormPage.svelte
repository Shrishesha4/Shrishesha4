<script lang="ts">
    import { onMount } from 'svelte';
    import { projects, type Project } from '$lib/stores/projects';
    import { navigate } from '$lib/router';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/firebase/config';
    import ImageUpload from '$lib/components/ImageUpload.svelte';
    import { API_BASE_URL } from '$lib/config';

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
        featured: false,
        resumeSummary: []
    };
    let loading = true;
    let isGenerating = false;

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
                // Ensure resumeSummary is initialized
                project.resumeSummary = project.resumeSummary || [];
            } else {
                toast.show('Project not found', 'error');
                navigate('/');
            }
        }
        loading = false;
    });

    async function generateSummary() {
        if (!project.title || !project.description) {
            toast.show('Please fill in Title and Description first', 'error');
            return;
        }

        isGenerating = true;
        try {
            const response = await fetch(`${API_BASE_URL}/generate-summary`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: project.title,
                    description: project.description,
                    technologies: project.technologies
                })
            });

            if (!response.ok) throw new Error('Generation failed');

            const data = await response.json();
            if (data.summary) {
                project.resumeSummary = Array.isArray(data.summary) ? data.summary : [];
                toast.show('Summary generated successfully!', 'success');
            }
        } catch (error) {
            console.error(error);
            toast.show('Failed to generate summary', 'error');
        } finally {
            isGenerating = false;
        }
    }

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
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button 
                onclick={() => navigate('/?tab=projects')}
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
        <!-- svelte-ignore a11y_label_has_associated_control -->
            <div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div class="max-w-3xl mx-auto animate-workspace-in">
                    <form id="projectForm" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-8">
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
                                    oninput={(e) => {
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
                                <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">
                                    Resume Summary (AI Generated)
                                </label>
                                <div class="glass-card p-6 bg-neutral-50/50 dark:bg-white/5 border-neutral-200/50 space-y-4">
                                    <div class="flex justify-between items-center">
                                        <p class="text-xs text-neutral-500">
                                            Generate concise bullet points for your resume.
                                        </p>
                                        <button 
                                            type="button"
                                            onclick={generateSummary}
                                            disabled={isGenerating}
                                            class="glass-button px-4 py-2 text-xs font-bold flex items-center gap-2 {isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:text-orange-500'}"
                                        >
                                            {#if isGenerating}
                                                <i class="fas fa-spinner fa-spin"></i> Generating...
                                            {:else}
                                                <i class="fas fa-magic"></i> Generate with AI
                                            {/if}
                                        </button>
                                    </div>
                                    
                                    {#if project.resumeSummary && project.resumeSummary.length > 0}
                                        <div class="space-y-2">
                                            {#each (project.resumeSummary || []) as point, i}
                                                <div class="flex gap-2">
                                                    <span class="text-orange-500 mt-1">•</span>
                                                    <input 
                                                        type="text" 
                                                        bind:value={project.resumeSummary[i]}
                                                        class="glass-input w-full text-sm"
                                                    />
                                                    <!-- svelte-ignore a11y_consider_explicit_label -->
                                                    <button 
                                                        type="button"
                                                        onclick={() => {
                                                            project.resumeSummary = (project.resumeSummary || []).filter((_, idx) => idx !== i);
                                                        }}
                                                        class="text-neutral-400 hover:text-red-500"
                                                    >
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            {/each}
                                            <button 
                                                type="button"
                                                onclick={() => project.resumeSummary = [...(project.resumeSummary || []), '']}
                                                class="text-xs text-orange-500 font-bold hover:underline mt-2"
                                            >
                                                + Add Point
                                            </button>
                                        </div>
                                    {:else}
                                        <div class="text-center py-8 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg">
                                            <p class="text-sm text-neutral-500">No summary generated yet.</p>
                                        </div>
                                    {/if}
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