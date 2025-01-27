<script lang="ts">
    import { blogs } from '$lib/stores/blogs';
    import { onMount } from 'svelte';

    onMount(async () => {
        await blogs.load();
    });
</script>

<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-4xl font-bold">Posts</h1>
        </div>

        <div class="space-y-8">
            {#each $blogs as blog}
                <a 
                    href="/blogs/{blog.slug}" 
                    class="block group"
                >
                    <article class="bg-neutral-200 dark:bg-neutral-800 p-3 sm:p-6 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 hover:shadow-sm">
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
                            <p class="text-neutral-600 dark:text-neutral-400 mb-4">
                                {blog.description}
                            </p>
                            <div class="flex items-center justify-between">
                                <div class="flex gap-2">
                                    {#each blog.tags as tag}
                                        <span class="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-xs">
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
    </div>
</div>