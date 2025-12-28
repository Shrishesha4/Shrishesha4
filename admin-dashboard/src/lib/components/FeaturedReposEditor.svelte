<script lang="ts">
    import { onMount } from 'svelte';
    import { profile } from '$lib/stores/profile';
    import { toast } from '$lib/stores/toast';
    import LoadingSpinner from './LoadingSpinner.svelte';
    
    interface GithubRepo {
        id: number;
        name: string;
        description: string;
        html_url: string;
        language: string;
        stargazers_count: number;
        forks_count: number;
    }

    let repos: GithubRepo[] = [];
    let featuredRepoIds: string[] = [];
    let loading = true;
    let error = '';
    let searchQuery = '';
    let selectedFilter = 'all';
    let showFilterDropdown = false;

    onMount(async () => {
        // Load profile first to get current featured repos
        try {
            await profile.load();
        } catch (err) {
            console.error('Error loading profile:', err);
        }
        await loadRepos();
    });

    async function loadRepos() {
        try {
            const response = await fetch('https://api.github.com/users/shrishesha4/repos');
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            repos = await response.json();
            repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            
            // Load current featured repos from profile
            featuredRepoIds = $profile.featuredRepos || [];
            console.log('Loaded featured repos from profile:', featuredRepoIds);
            
            loading = false;
        } catch (err) {
            console.error('Error loading repos:', err);
            error = 'Failed to load GitHub repositories';
            loading = false;
        }
    }

    function toggleRepo(repoName: string) {
        if (featuredRepoIds.includes(repoName)) {
            featuredRepoIds = featuredRepoIds.filter(id => id !== repoName);
        } else {
            featuredRepoIds = [...featuredRepoIds, repoName];
        }
    }

    async function saveFeaturedRepos() {
        try {
            console.log('Saving featured repos:', featuredRepoIds);
            console.log('Current profile:', $profile);
            await profile.set({
                ...$profile,
                featuredRepos: featuredRepoIds
            });
            console.log('Successfully saved featured repos to profile');
            toast.show('Featured repositories updated!', 'success');
        } catch (err) {
            console.error('Error saving featured repos:', err);
            toast.show('Failed to update featured repositories', 'error');
        }
    }

    // Filter repos by search and language
    $: filteredRepos = repos.filter(repo => {
        const matchesSearch = !searchQuery ||
            repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesFilter = selectedFilter === 'all' ||
            (repo.language && repo.language.toLowerCase() === selectedFilter.toLowerCase());
        
        return matchesSearch && matchesFilter;
    });

    // Get unique languages for filtering
    $: availableLanguages = (() => {
        const langCount = new Map<string, number>();
        repos.forEach(repo => {
            if (repo.language) {
                langCount.set(repo.language, (langCount.get(repo.language) || 0) + 1);
            }
        });
        return Array.from(langCount.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    })();
</script>

<div class="space-y-6">
    <div class="flex justify-between items-center">
        <div>
            <h2 class="text-xl font-bold text-neutral-900 dark:text-white">Featured Repositories</h2>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">Select up to 4 repositories to feature on your homepage</p>
        </div>
        <button 
            on:click={saveFeaturedRepos}
            class="glass-button glass-button-primary px-6 py-2 shadow-lg shadow-orange-500/20"
        >
            Save
        </button>
    </div>

    <!-- Search and Filter -->
    <div class="flex items-center gap-3">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search repositories..."
                class="w-full px-4 py-2 pl-10 rounded-lg bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
            <i class="fab fa-github absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></i>
            {#if searchQuery}
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                    on:click={() => searchQuery = ''}
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                    <i class="fas fa-times"></i>
                </button>
            {/if}
        </div>

        <!-- Filter Dropdown -->
        <div class="relative">
            <button
                on:click={() => showFilterDropdown = !showFilterDropdown}
                class="px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-2 whitespace-nowrap"
            >
                <i class="fas fa-code text-neutral-500"></i>
                <span class="hidden md:inline">{selectedFilter === 'all' ? 'All Languages' : selectedFilter}</span>
                <i class="fas fa-chevron-down text-xs"></i>
            </button>
            
            {#if showFilterDropdown}
                <div class="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xl z-50 overflow-hidden">
                    <div class="p-2 max-h-80 overflow-y-auto">
                        <button
                            on:click={() => { selectedFilter = 'all'; showFilterDropdown = false; }}
                            class="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors {selectedFilter === 'all' ? 'bg-orange-100 dark:bg-orange-900/30' : ''}"
                        >
                            All Languages
                        </button>
                        {#if availableLanguages.length > 0}
                            <div class="border-t border-neutral-200 dark:border-neutral-700 my-2"></div>
                            {#each availableLanguages as lang}
                                <button
                                    on:click={() => { selectedFilter = lang.name; showFilterDropdown = false; }}
                                    class="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors text-sm {selectedFilter === lang.name ? 'bg-orange-100 dark:bg-orange-900/30' : ''}"
                                >
                                    <div class="flex items-center justify-between">
                                        <span>{lang.name}</span>
                                        <span class="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">{lang.count}</span>
                                    </div>
                                </button>
                            {/each}
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </div>

    {#if loading}
        <div class="flex justify-center py-8">
            <LoadingSpinner />
        </div>
    {:else if error}
        <div class="text-red-500 text-center p-4 glass-card">{error}</div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each filteredRepos as repo}
                <div class="glass-card p-4 hover:border-orange-500/30 transition-all duration-300 cursor-pointer {featuredRepoIds.includes(repo.name) ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/10' : ''}"
                    on:click={() => toggleRepo(repo.name)}
                    on:keydown={(e) => e.key === 'Enter' && toggleRepo(repo.name)}
                    role="button"
                    tabindex="0"
                >
                    <div class="flex items-start gap-3">
                        <div class="flex-shrink-0 mt-1">
                            <input 
                                type="checkbox" 
                                checked={featuredRepoIds.includes(repo.name)}
                                on:change={() => toggleRepo(repo.name)}
                                class="w-5 h-5 rounded border-2 border-neutral-300 dark:border-neutral-600 text-orange-500 focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <h3 class="font-bold text-neutral-900 dark:text-white truncate">{repo.name}</h3>
                                {#if featuredRepoIds.includes(repo.name)}
                                    <span class="px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs font-bold flex-shrink-0">
                                        Featured
                                    </span>
                                {/if}
                            </div>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-2">
                                {repo.description || 'No description'}
                            </p>
                            <div class="flex flex-wrap gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                                {#if repo.language}
                                    <span class="flex items-center gap-1">
                                        <span class="w-2 h-2 rounded-full bg-primary-500"></span>
                                        {repo.language}
                                    </span>
                                {/if}
                                <span>⭐ {repo.stargazers_count}</span>
                                <span>🍴 {repo.forks_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        {#if featuredRepoIds.length > 4}
            <div class="glass-card p-4 bg-orange-50/50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700">
                <p class="text-sm text-orange-600 dark:text-orange-400">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    You have selected {featuredRepoIds.length} repositories. Only the first 4 will be displayed.
                </p>
            </div>
        {/if}
    {/if}
</div>
