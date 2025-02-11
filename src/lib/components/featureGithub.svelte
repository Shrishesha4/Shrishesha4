<script lang="ts">
    import { onMount } from 'svelte';
    import { githubService } from '$lib/services/github';
    
    let repos: any[] = [];
    let error: string = '';
    let loading = true;

    onMount(async () => {
        await loadRepositories();
    });

    async function loadRepositories() {
        try {
            repos = await githubService.getRepositories();
            repos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
            loading = false;
        } catch (err) {
            console.error('Error fetching repositories:', err);
            error = 'Failed to load repositories';
            loading = false;
        }
    }
</script>

<div>
    <h2 class="mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100">Featured Repositories</h2>
    {#if error}
        <div class="mb-8 rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400">
            {error}
            <button class="ml-4 text-sm underline" on:click={loadRepositories}>
                Try again
            </button>
        </div>
    {:else if repos.length > 0}
        <div class="grid gap-6 md:grid-cols-2">
            {#each repos.slice(0, 4) as repo}
                <div class="glass-card glass-card-hover p-6">
                    <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0">
                            <i class="fab fa-github text-4xl text-black-400 group-hover:text-primary-500 transition-colors duration-200"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-xl font-bold text-neutral-900 dark:text-neutral-100 truncate group-hover:text-primary-500 transition-colors duration-200">
                                {repo.name}
                            </h3>
                            <p class="mb-4 line-clamp-2 text-neutral-600 dark:text-neutral-300">
                                {repo.description || 'No description available'}
                            </p>
                            <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                                {#if repo.language}
                                    <span class="flex items-center">
                                        <span class="w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                                        {repo.language}
                                    </span>
                                {/if}
                                <span class="flex items-center">⭐ {repo.stargazers_count}</span>
                                <span class="flex items-center">🍴 {repo.forks_count}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="glass-button block rounded-md px-4 py-2 text-center text-sm text-black dark:text-white transition-all duration-200 hover:bg-neutral-700/10 dark:hover:bg-neutral-500/10 hover:backdrop-blur-lg backdrop-blur-sm hover:shadow-lg hover:scale-105"
                        >
                            <i class="fab fa-github mr-1"></i>
                            View Repository
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-center text-neutral-600 dark:text-neutral-400">
            No repositories available yet.
        </p>
    {/if}
</div>