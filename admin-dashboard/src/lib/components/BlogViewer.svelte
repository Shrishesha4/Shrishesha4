<script lang="ts">
    import { onMount } from 'svelte';
    import { blogs } from './../stores/blogs';

    onMount(async () => {
        await blogs.load();
    });

    function truncateText(text: string, limit: number = 150): string {
        if (text.length <= limit) return text;
        return text.slice(0, limit).trim() + '...';
    }
</script>

<div class="space-y-8">
    {#each $blogs as blog}
        <a 
            href="/blogs/{blog.slug}"
            class="block group"
        >
            <article class="glass-card glass-card-hover p-3 sm:p-6">
                {#if blog.image}
                    <img
                        src={blog.image}
                        alt={blog.title}
                        class="w-full h-48 object-cover rounded-xl"
                    />
                {/if}
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {blog.title}
                    </h2>
                    <div class="text-neutral-600 dark:text-neutral-400 mb-4">
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
            </article>
        </a>
    {/each}
</div>