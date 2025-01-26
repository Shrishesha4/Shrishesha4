<script lang="ts">
    import { blogs } from '$lib/stores/blogs';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let currentBlog: typeof $blogs[0] | undefined;

    onMount(async () => {
        await blogs.load();
        currentBlog = $blogs.find(blog => blog.slug === $page.params.slug);
    });
</script>

{#if currentBlog}
    <article class="min-h-screen p-4">
        <div class="max-w-3xl mx-auto">
            <a href="/blogs" class="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8">
                <i class="fas fa-chevron-left mr-2"></i>
                Posts
            </a>

            <header class="mb-8">
                <h1 class="text-4xl font-bold mb-4">{currentBlog.title}</h1>
                <div class="flex items-center justify-between">
                    <div class="flex gap-2">
                        {#each currentBlog.tags as tag}
                            <span class="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-sm">
                                {tag}
                            </span>
                        {/each}
                    </div>
                    <time class="text-neutral-500 dark:text-neutral-400">
                        {new Date(currentBlog.date).toLocaleDateString()}
                    </time>
                </div>
            </header>

            {#if currentBlog.image}
                <img 
                    src={currentBlog.image} 
                    alt={currentBlog.title}
                    class="w-full h-64 object-cover rounded-xl mb-8"
                />
            {/if}

            <div class="prose dark:prose-invert max-w-none">
                {@html currentBlog.content}
            </div>
        </div>
    </article>
{:else}
    <div class="min-h-screen flex items-center justify-center">
        <p class="text-neutral-600 dark:text-neutral-400">Blog post not found</p>
    </div>
{/if}