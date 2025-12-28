<script lang="ts">
    import { onMount } from 'svelte';
    import { blogs } from './../stores/blogs';

    export let searchQuery = '';
    export let selectedFilter = 'all';

    onMount(async () => {
        await blogs.load();
    });

    function truncateText(text: string, limit: number = 650): string {
        if (text.length <= limit) return text;
        return text.slice(0, limit).trim() + '...';
    }

    $: filteredBlogs = $blogs.filter(blog => {
        const matchesSearch = !searchQuery ||
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter = selectedFilter === 'all' ||
            (blog.tags && blog.tags.some(tag => tag.toLowerCase() === selectedFilter.toLowerCase()));

        return matchesSearch && matchesFilter;
    });
</script>

<div class="space-y-8">
    {#each filteredBlogs as blog}
        <a 
            href="/blogs/{blog.slug}"
            class="glass-card glass-card-hover block flex flex-col sm:flex-row sm:items-stretch overflow-hidden group"
        >
            {#if blog.image}
                <div class="w-full sm:w-2/5 h-48 sm:h-auto flex-shrink-0">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        class="w-full h-full object-cover feathered-image"
                    />
                </div>
            {/if}
            <div class="flex-1 flex flex-col p-6 justify-center">
                <h2 class="text-2xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {blog.title}
                </h2>
                <div class="text-neutral-600 dark:text-neutral-400 mb-4 flex-1">
                    <p>{truncateText(blog.description)}</p>
                    <span class="text-primary-600 dark:text-primary-400 hover:underline mt-2 inline-block">
                        Read more
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex flex-wrap gap-2">
                        {#each blog.tags as tag}
                            <span class="glass-button text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                                {tag}
                            </span>
                        {/each}
                    </div>
                    <time class="text-sm text-neutral-500 dark:text-neutral-400">
                        {new Date(blog.date).toLocaleDateString()}
                    </time>
                </div>
            </div>
        </a>
    {/each}
</div>

<style>
    @media (min-width: 640px) { /* sm breakpoint */
        .feathered-image {
            mask-image: linear-gradient(to right, black 80%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
        }
    }
</style>