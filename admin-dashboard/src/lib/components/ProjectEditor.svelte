<script lang="ts">
    import LoadingSpinner from './LoadingSpinner.svelte';
    import { projects, type Project } from '$lib/stores/projects';
    import { auth } from '$lib/firebase/config';
    import { onMount } from 'svelte';
    import { navigate } from '$lib/router';
    import { toast } from '$lib/stores/toast';
    
    let searchQuery = $state('');
    let selectedFilter = $state('all');
    let showFilterDropdown = $state(false);

    // Category keywords for filtering
    const categoryKeywords = {
        'Web Development': ['web', 'website', 'frontend', 'backend', 'fullstack', 'html', 'css', 'javascript', 'react', 'vue', 'angular', 'svelte', 'next', 'nuxt', 'node', 'express', 'django', 'flask'],
        'Mobile Apps': ['mobile', 'app', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin'],
        'AI & ML': ['ai', 'ml', 'machine learning', 'neural', 'deep learning', 'tensorflow', 'pytorch'],
        'Tools & Utilities': ['tool', 'utility', 'cli', 'automation', 'script', 'bot'],
        'Other': []
    };

    function categorizeProject(title: string, description: string, technologies: string[]): string[] {
        const text = `${title} ${description} ${technologies.join(' ')}`.toLowerCase();
        const categories: string[] = [];

        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (category === 'Other') continue;
            const matches = keywords.some(keyword => text.includes(keyword.toLowerCase()));
            if (matches) categories.push(category);
        }

        return categories.length > 0 ? categories : ['Other'];
    }
    
    let currentProjects: Project[] = $state([]);
    let loading = $state(true);
    let error = $state('');

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

    $effect(() => {
        if ($projects) {
            currentProjects = [...$projects];
        }
    });

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

    async function toggleFeatured(project: Project) {
        try {
            const updatedProjects = currentProjects.map(p => 
                p.id === project.id ? { ...p, featured: !p.featured } : p
            );
            await projects.set(updatedProjects);
            toast.show(`Project ${project.featured ? 'removed from' : 'added to'} featured!`, 'success');
        } catch (error) {
            toast.show('Failed to update project', 'error');
        }
    }

    // Filtered projects based on search and category
    let filteredProjects = $derived(currentProjects.filter(project => {
        const matchesSearch = !searchQuery || 
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesFilter = selectedFilter === 'all' || 
            categorizeProject(project.title, project.description, project.technologies).includes(selectedFilter);
        
        return matchesSearch && matchesFilter;
    }));

    // Available categories from current projects
    let availableCategories = $derived((() => {
        const categoryCount = new Map<string, number>();
        currentProjects.forEach(project => {
            const categories = categorizeProject(project.title, project.description, project.technologies);
            categories.forEach(cat => categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1));
        });
        return Array.from(categoryCount.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    })());
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
                onclick={handleAdd}
                class="glass-button glass-button-primary px-4 py-2 flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
                <i class="fas fa-plus"></i> <span class="hidden sm:inline">New Project</span>
            </button>
        </div>

        <!-- Search and Filter -->
        <div class="flex items-center gap-3 mb-6">
            <!-- Search Input -->
            <div class="relative flex-1 max-w-md">
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search projects..."
                    class="w-full px-4 py-2 pl-10 rounded-lg bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>
                {#if searchQuery}
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button
                        onclick={() => searchQuery = ''}
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                {/if}
            </div>

            <!-- Filter Dropdown -->
            <div class="relative">
                <button
                    onclick={() => showFilterDropdown = !showFilterDropdown}
                    class="px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                    <i class="fas fa-filter text-neutral-500"></i>
                    <span class="hidden md:inline">{selectedFilter === 'all' ? 'All' : selectedFilter}</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                </button>
                
                {#if showFilterDropdown}
                    <div class="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xl z-50 overflow-hidden">
                        <div class="p-2">
                            <button
                                onclick={() => { selectedFilter = 'all'; showFilterDropdown = false; }}
                                class="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors {selectedFilter === 'all' ? 'bg-orange-100 dark:bg-orange-900/30' : ''}"
                            >
                                All Projects
                            </button>
                            {#if availableCategories.length > 0}
                                <div class="border-t border-neutral-200 dark:border-neutral-700 my-2"></div>
                                {#each availableCategories as category}
                                    <button
                                        onclick={() => { selectedFilter = category.name; showFilterDropdown = false; }}
                                        class="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors text-sm {selectedFilter === category.name ? 'bg-orange-100 dark:bg-orange-900/30' : ''}"
                                    >
                                        <div class="flex items-center justify-between">
                                            <span>{category.name}</span>
                                            <span class="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">{category.count}</span>
                                        </div>
                                    </button>
                                {/each}
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredProjects as project}
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
                        {#if project.featured}
                            <div class="absolute top-2 right-2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                                <i class="fas fa-star"></i> Featured
                            </div>
                        {/if}
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

                        <!-- Actions (match BlogEditor style) -->
                        <div class="mt-4 flex sm:flex-col gap-3 w-full sm:w-auto">
                            <button 
                                onclick={() => toggleFeatured(project)}
                                class="w-full sm:w-auto glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 {project.featured ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700' : ''}"
                                title={project.featured ? 'Remove from featured' : 'Add to featured'}
                            >
                                <i class="fas fa-star"></i> <span class="sm:hidden">{project.featured ? 'Featured' : 'Feature'}</span>
                            </button>
                            <button 
                                onclick={() => handleEdit(project)}
                                class="w-full sm:w-auto glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 hover:text-orange-600 dark:hover:text-orange-400"
                            >
                                <i class="fas fa-pen"></i> <span class="sm:hidden">Edit</span>
                            </button>
                            <button 
                                onclick={() => handleRemove(project)}
                                class="w-full sm:w-auto glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"
                            >
                                <i class="fas fa-trash"></i> <span class="sm:hidden">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}