<script lang="ts">
    import { blogs } from '$lib/stores/blogs';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    let currentBlog: typeof $blogs[0] | undefined;
    let loading = true;
    let readerMode = false;

    onMount(async () => {
        try {
            await blogs.load();
            currentBlog = $blogs.find(blog => blog.slug === $page.params.slug);
        } finally {
            loading = false;
        }
    });

    function toggleReaderMode() {
        readerMode = !readerMode;
    }
</script>

{#if loading}
    <LoadingSpinner />
{:else if currentBlog}
    <article class="min-h-screen p-4 md:p-8 transition-all duration-500 ease-in-out">
        <div class="{readerMode ? 'max-w-2xl' : 'max-w-7xl'} mx-auto transition-all duration-500 ease-in-out">
            <div class="flex items-center justify-between mb-8">
                <a href="/blogs" class="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    <i class="fas fa-chevron-left mr-2"></i>
                    Posts
                </a>
                
                <button 
                    on:click={toggleReaderMode}
                    class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
                    title={readerMode ? "Exit Reader Mode" : "Enter Reader Mode"}
                >
                    <i class="fas {readerMode ? 'fa-book-open' : 'fa-book'} text-xl"></i>
                </button>
            </div>

            <header class="mb-8 {readerMode ? 'text-center' : ''}">
                <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight {readerMode ? 'text-neutral-900 dark:text-neutral-100' : ''}">
                    {currentBlog.title}
                </h1>
                <div class="flex items-center {readerMode ? 'justify-center' : 'justify-between'} gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div class="flex flex-wrap gap-2 items-center">
                        {#if !readerMode}
                            {#each currentBlog.tags as tag}
                                <span class="px-3 py-1 glass-button dark:bg-neutral-800 rounded-full text-sm flex-shrink-0">
                                    {tag}
                                </span>
                            {/each}
                        {/if}
                    </div>
                    <time class="flex-shrink-0 font-medium">
                        {new Date(currentBlog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                </div>
            </header>

            {#if currentBlog.image && !readerMode}
                <div class="w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl mb-12 shadow-2xl">
                    <img 
                        src={currentBlog.image} 
                        alt={currentBlog.title}
                        class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                </div>
            {/if}

            <div class="prose dark:prose-invert max-w-none {readerMode ? 'prose-lg md:prose-xl leading-relaxed' : 'prose-lg'} marker:text-primary-500">
                {@html currentBlog.content}
            </div>
        </div>
    </article>
{:else}
    <div class="min-h-screen flex items-center justify-center">
        <p class="text-neutral-600 dark:text-neutral-400 text-xl">Blog post not found</p>
    </div>
{/if}

<style>
    /* Add smooth transitions for layout changes */
    :global(html) {
        scroll-behavior: smooth;
    }
</style>