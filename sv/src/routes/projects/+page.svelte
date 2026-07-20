<script lang="ts">
    import BuyMeCoffee from '$lib/components/BuyMeCoffee.svelte';
    import { projects } from '$lib/stores/projects';
    import { onMount } from 'svelte';
    import ProjectViewer from '$lib/components/projectviewer.svelte';
    import GithubRepos from '$lib/components/GithubRepos.svelte';

    let githubError = $state(false);
    let searchQuery = $state('');
    let selectedFilter = $state('all');
    let availableCategories: { name: string; count: number }[] = $state([]);
    let showFilterDropdown = $state(false);

    // Intelligent categorization based on keywords
    const categoryKeywords = {
        'Web Development': ['web', 'website', 'frontend', 'backend', 'fullstack', 'html', 'css', 'javascript', 'react', 'vue', 'angular', 'svelte', 'next', 'nuxt', 'node', 'express', 'django', 'flask', 'api', 'rest', 'graphql'],
        'Mobile Apps': ['mobile', 'app', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin', 'xamarin'],
        'AI & Machine Learning': ['ai', 'ml', 'machine learning', 'artificial intelligence', 'neural', 'deep learning', 'tensorflow', 'pytorch', 'model', 'nlp', 'computer vision', 'prediction'],
        'Data Science': ['data', 'analytics', 'visualization', 'dashboard', 'analysis', 'pandas', 'numpy', 'jupyter', 'statistics', 'insights'],
        'Blockchain & Web3': ['blockchain', 'crypto', 'web3', 'ethereum', 'solidity', 'nft', 'defi', 'smart contract', 'dapp'],
        'Game Development': ['game', 'gaming', 'unity', 'unreal', 'godot', 'phaser', 'gameplay'],
        'DevOps & Cloud': ['devops', 'cloud', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'deployment', 'infrastructure'],
        'Tools & Utilities': ['tool', 'utility', 'cli', 'automation', 'script', 'bot', 'extension', 'plugin'],
        'E-commerce': ['shop', 'store', 'ecommerce', 'e-commerce', 'cart', 'payment', 'checkout', 'marketplace'],
        'Social & Networking': ['social', 'chat', 'messaging', 'community', 'forum', 'network', 'communication'],
        'Portfolio & Personal': ['portfolio', 'personal', 'blog', 'resume', 'cv', 'profile'],
        'Other': []
    } as const;

    const categorizeProject = (title: string, description: string, technologies: string[] = []): string[] => {
        const text = `${title} ${description} ${technologies.join(' ')}`.toLowerCase();
        const categories: string[] = [];

        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (category === 'Other') continue;
            
            const matches = keywords.some(keyword => text.includes(keyword.toLowerCase()));
            if (matches) {
                categories.push(category);
            }
        }

        return categories.length > 0 ? categories : ['Other'];
    };

    onMount(async () => {
        await projects.load();
        updateAvailableCategories();
    });

    function updateAvailableCategories() {
        const categoryCount = new Map<string, number>();
        
        $projects.forEach(project => {
            const categories = categorizeProject(project.title, project.description, project.technologies);
            categories.forEach(cat => {
                categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1);
            });
        });

        availableCategories = Array.from(categoryCount.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }

    function handleGithubError() {
        githubError = true;
    }

    $effect(() => {
        updateAvailableCategories();
    });
</script>

<div class="min-h-screen p-4 md:p-8">
    <div class="max-w-1xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-12">
            <h1 class="text-4xl font-bold tracking-tight">Projects</h1>
            
            <!-- Search and Filter Section -->
            <div class="flex items-center gap-3 flex-1 max-w-xl md:justify-end">
                <!-- Search Input -->
                <div class="relative flex-1 max-w-sm">
                    <input
                        type="text"
                        bind:value={searchQuery}
                        placeholder="Search projects..."
                        class="w-full px-5 py-3 pl-11 rounded-2xl bg-neutral-100/80 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all backdrop-blur-sm"
                    />
                    <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"></i>
                    {#if searchQuery}
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button
                            onclick={() => searchQuery = ''}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    {/if}
                </div>

                <!-- Filter Dropdown -->
                <div class="relative">
                    <button
                        onclick={() => showFilterDropdown = !showFilterDropdown}
                        class="px-5 py-3 rounded-2xl bg-neutral-100/80 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-neutral-200/80 dark:hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-2 whitespace-nowrap"
                    >
                        <i class="fas fa-filter text-neutral-500 dark:text-neutral-400"></i>
                        <span class="hidden md:inline font-medium">{selectedFilter === 'all' ? 'All' : selectedFilter}</span>
                        <i class="fas fa-chevron-down text-xs text-neutral-500 dark:text-neutral-400 ml-1"></i>
                    </button>
                    
                    {#if showFilterDropdown}
                        <div class="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-xl z-50 backdrop-blur-md overflow-hidden">
                            <div class="p-2">
                                <button
                                    onclick={() => { selectedFilter = 'all'; showFilterDropdown = false; }}
                                    class="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors {selectedFilter === 'all' ? 'bg-primary-100 dark:bg-primary-900' : ''}"
                                >
                                    <span class="font-medium">All Projects</span>
                                </button>
                                {#if availableCategories.length > 0}
                                    <div class="border-t border-neutral-200 dark:border-neutral-700 my-2"></div>
                                    <div class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 px-3 py-1">Categories</div>
                                    {#each availableCategories as category}
                                        <button
                                            onclick={() => { selectedFilter = category.name; showFilterDropdown = false; }}
                                            class="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors text-sm {selectedFilter === category.name ? 'bg-primary-100 dark:bg-primary-900' : ''}"
                                        >
                                            <div class="flex items-center justify-between">
                                                <span>{category.name}</span>
                                                <span class="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">{category.count}</span>
                                            </div>
                                        </button>
                                    {/each}
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
        
        <ProjectViewer {searchQuery} {selectedFilter} {categorizeProject} />
        {#if !githubError}
            <GithubRepos onerror={handleGithubError} {searchQuery} {selectedFilter} {categorizeProject} />
        {/if}
    </div>
</div>

<!-- Click outside to close dropdown -->
<svelte:window on:click={(e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
        showFilterDropdown = false;
    }
}} />