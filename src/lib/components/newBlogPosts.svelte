<script lang="ts">
    import type { Blog } from '$lib/types';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    
    export let posts: Blog[] = [];
    export let error: string = '';
    export let onRetry: () => void;

    let visibleCards: Set<number> = new Set();
    let observer: IntersectionObserver | null = null;

    onMount(() => {
        setupObserver();
        return () => {
            if (observer) observer.disconnect();
        };
    });

    function setupObserver() {
        if (observer) observer.disconnect();

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        visibleCards = new Set([...visibleCards, index]);
                        observer?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        setTimeout(() => {
            if (browser) {
                const cards = document.querySelectorAll('.post-card');
                cards.forEach((card) => observer?.observe(card));
            }
        }, 100);
    }

    // Re-run observer when posts update (e.g., loading finishes)
    $: if (browser && sortedPosts && sortedPosts.length > 0) {
        visibleCards = new Set(); // Reset visibility to re-animate on sort/filter
        setTimeout(() => {
            const cards = document.querySelectorAll('.post-card');
            cards.forEach((card) => observer?.observe(card));
        }, 100);
    }

    function truncateText(text: string, limit: number = 80): string {
        if (text.length <= limit) return text;
        return text.slice(0, limit).trim() + '...';
    }

    // Sort posts by date in descending order
    $: sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
</script>

<div>
    <h2 class="mt-6 mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100 md:text-right">Latest Posts</h2>
    {#if error}
        <div class="mb-8 rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400">
            {error}
            <button class="ml-4 text-sm underline" on:click={onRetry}>Try again</button>
        </div>
    {:else if posts.length > 0}
        <div class="space-y-6">
            {#each sortedPosts.slice(0, 3) as post, index}
                <a 
                    href={`/blogs/${post.slug}`} 
                    data-index={index}
                    class="post-card group glass-card glass-card-hover block flex flex-row overflow-hidden min-h-[130px] sm:min-h-[160px]"
                    class:opacity-0={!visibleCards.has(index)}
                    class:animate-fade-in-up={visibleCards.has(index)}
                    style="animation-delay: {index * 100}ms;"
                >
                    {#if post.image}
                        <div class="w-28 sm:w-1/4 h-auto flex-shrink-0 overflow-hidden">
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                class="w-full h-full object-cover feathered-image transition-transform duration-500 group-hover:scale-105" 
                            />
                        </div>
                    {/if}
                    <div class="flex-1 flex flex-col p-3 sm:p-4 relative z-10 bg-white/0">
                        <div class="flex justify-between items-start mb-0.5 sm:mb-1">
                            <h3 class="text-base sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1 sm:line-clamp-2">
                                {post.title}
                            </h3>
                            <span class="hidden xs:block text-[9px] sm:text-[10px] text-neutral-500 dark:text-neutral-400 whitespace-nowrap ml-2 sm:ml-4 mt-0.5">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                        
                        <p class="text-[11px] sm:text-sm font-light dark:font-thin text-neutral-700 dark:text-neutral-300 mb-2 flex-1 line-clamp-2">
                            {truncateText(post.description, 100)}
                            <span class="text-primary-600 dark:text-primary-400 font-bold hover:underline inline-block ml-1">
                                Read more
                            </span>
                        </p>
                        
                        <div class="mt-auto flex flex-wrap gap-1">
                            {#each post.tags as tag}
                                <span class="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-medium bg-primary-500/10 text-primary-700 dark:text-primary-400 border border-primary-500/20">
                                    {tag}
                                </span>
                            {/each}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <p class="text-center text-neutral-600 dark:text-neutral-400">
            No blog posts available yet.
        </p>
    {/if}
</div>

<style>
    .feathered-image {
        mask-image: linear-gradient(to right, black 80%, transparent 100%);
        -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
    }

    /* Animation Styles */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .animate-fade-in-up {
        /* Changed forwards to both to apply the 'from' state immediately upon class addition, preventing the blink */
        animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
        /* Prevent CSS transitions from interfering with the animation to avoid blinking */
        transition: none !important;
        backface-visibility: hidden;
        will-change: transform, opacity;
    }

    .post-card {
        position: relative;
        will-change: transform, opacity;
        /* Base transition reset to prevent flash before animation */
        transition: none;
    }

    .post-card.opacity-0 {
        opacity: 0;
        transform: translateY(20px) scale(0.98);
        transition: none !important;
    }
</style>