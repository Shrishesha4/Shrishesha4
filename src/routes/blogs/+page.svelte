<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { blogs } from '$lib/stores/blogs';
    import BlogViewer from '$lib/components/BlogViewer.svelte';

    let searchQuery = '';
    let selectedFilter = 'all';
    let showFilterDropdown = false;
    let availableTags: { name: string; count: number }[] = [];

    onMount(async () => {
        await blogs.load();
        const current = (get(blogs) || []) as Array<{ tags?: string[] }>;
        const allTags = current.flatMap(blog => blog.tags || []);
        const tagCount = new Map<string, number>();
        allTags.forEach(tag => {
            tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
        });
        availableTags = Array.from(tagCount.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    });
</script>

<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-0">
    
        <h1 class="text-4xl font-bold">Blogs</h1>
        <!-- Search and Filter Section -->
        <div class="mb-6 flex items-center gap-3">
            <!-- Search Input -->
            <div class="relative flex-1">
                <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search posts..."
                class="w-full px-4 py-2.5 pl-10 rounded-lg bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all backdrop-blur-sm"
                />
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"></i>
                {#if searchQuery}
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                on:click={() => searchQuery = ''}
                class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                <i class="fas fa-times"></i>
            </button>
            {/if}
        </div>
        
        <!-- Filter Dropdown -->
        <div class="relative">
            <button
            on:click={() => showFilterDropdown = !showFilterDropdown}
            class="px-4 py-2.5 rounded-lg bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-all backdrop-blur-sm flex items-center gap-2 whitespace-nowrap"
            >
            <i class="fas fa-filter"></i>
            <span class="hidden md:inline">{selectedFilter === 'all' ? 'All' : selectedFilter}</span>
            <i class="fas fa-chevron-down text-xs"></i>
        </button>
        
        {#if showFilterDropdown}
        <div class="absolute right-0 mt-2 w-64 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xl z-50 backdrop-blur-sm max-h-96 overflow-y-auto">
            <div class="p-2">
                <button
                on:click={() => { selectedFilter = 'all'; showFilterDropdown = false; }}
                class={"w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors " + (selectedFilter === 'all' ? 'bg-primary-100 dark:bg-primary-900' : '')}
                >
                <span class="font-medium">All Posts</span>
            </button>
            {#if availableTags.length > 0}
            <div class="border-t border-neutral-200 dark:border-neutral-700 my-2"></div>
            <div class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 px-3 py-1">Tags</div>
            {#each availableTags as tag}
            <button
            on:click={() => { selectedFilter = tag.name; showFilterDropdown = false; }}
            class={"w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors text-sm " + (selectedFilter === tag.name ? 'bg-primary-100 dark:bg-primary-900' : '')}
            >
            <div class="flex items-center justify-between">
                <span>{tag.name}</span>
                <span class="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">{tag.count}</span>
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
<BlogViewer bind:searchQuery bind:selectedFilter />
    </div>
</div>

<!-- Click outside to close dropdown -->
<svelte:window on:click={(e: Event) => {
    const target = (e.target as HTMLElement) || null;
    if (!target || !target.closest('.relative')) {
        showFilterDropdown = false;
    }
}} />