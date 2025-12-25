<script lang="ts">
    import { blogs } from '$lib/stores/blogs';
    import { toast } from '$lib/stores/toast';
    import { onMount } from 'svelte';
    import { navigate } from '$lib/router';
    import { auth } from '$lib/firebase/config';
    import LoadingSpinner from './LoadingSpinner.svelte';
    
    export let editingBlog: any = null; // Kept for prop compatibility
    
    let allBlogs: typeof $blogs = [];
    let loading = true;
    
    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    navigate('/login');
                    return;
                }
                await blogs.load();
                allBlogs = [...$blogs];
                loading = false;
            } catch (err) {
                toast.show('Failed to load blogs data', 'error');
                loading = false;
            }
        });
    
        return () => unsubscribe();
    });

    $: if ($blogs) {
        allBlogs = [...$blogs];
    }

    function handleAdd() {
        navigate('/blogs/new');
    }

    function handleEdit(blog: any) {
        navigate(`/blogs/edit/${blog.id}`);
    }

    async function handleDelete(blogId: string) {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const updatedBlogs = allBlogs.filter(blog => blog.id !== blogId);
            await blogs.set(updatedBlogs);
            toast.show('Blog post deleted successfully!', 'success');
        } catch (error) {
            toast.show('Failed to delete blog post', 'error');
        }
    }
</script>

{#if loading}
    <LoadingSpinner />
{:else}
    <div class="space-y-6 pb-20 md:pb-0">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Blog Posts</h1>
                <p class="text-neutral-500 dark:text-neutral-400 text-sm">Manage your editorial content</p>
            </div>
            <button 
                on:click={handleAdd}
                class="glass-button glass-button-primary px-4 py-2 flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
                <i class="fas fa-plus"></i> <span class="hidden sm:inline">New Post</span>
            </button>
        </div>

        <div class="grid grid-cols-1 gap-4">
            {#each allBlogs as blog}
                <div class="glass-card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center group hover:border-orange-500/30 transition-all duration-300">
                    <!-- Thumbnail -->
                    <div class="w-full sm:w-24 h-24 sm:h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0">
                        {#if blog.image}
                            <img src={blog.image} alt={blog.title} class="w-full h-full object-cover" />
                        {:else}
                            <div class="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-700">
                                <i class="fas fa-newspaper"></i>
                            </div>
                        {/if}
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white truncate">{blog.title}</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">{blog.description}</p>
                        <div class="flex items-center gap-2 mt-2">
                            <span class="text-xs font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
                                {new Date(blog.date).toLocaleDateString()}
                            </span>
                            {#if blog.tags && blog.tags.length > 0}
                                <span class="text-xs text-neutral-400">•</span>
                                <span class="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[150px]">
                                    {blog.tags.join(', ')}
                                </span>
                            {/if}
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <button 
                            on:click={() => handleEdit(blog)}
                            class="flex-1 sm:flex-none glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 hover:text-orange-600 dark:hover:text-orange-400"
                        >
                            <i class="fas fa-pen"></i> <span class="sm:hidden">Edit</span>
                        </button>
                        <button 
                            on:click={() => handleDelete(blog.id)}
                            class="flex-1 sm:flex-none glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"
                        >
                            <i class="fas fa-trash"></i> <span class="sm:hidden">Delete</span>
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}
