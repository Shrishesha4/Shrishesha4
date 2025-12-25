<script lang="ts">
    import { onMount } from 'svelte';
    import { blogs, type Blog } from '$lib/stores/blogs';
    import { navigate } from '$lib/router';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/firebase/config';
    import ImageUpload from '$lib/components/ImageUpload.svelte';

    const path = window.location.pathname;
    const isEdit = path.includes('/edit/');
    const id = isEdit ? path.split('/edit/')[1] : null;

    let blog: any = {
        id: crypto.randomUUID(),
        title: '',
        content: '',
        description: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        slug: ''
    };
    let loading = true;

    onMount(async () => {
        if (!auth.currentUser) {
            navigate('/login');
            return;
        }

        if (isEdit && id) {
            await blogs.load();
            const found = $blogs.find(b => b.id === id);
            if (found) {
                blog = JSON.parse(JSON.stringify(found));
            } else {
                toast.show('Blog post not found', 'error');
                navigate('/');
            }
        }
        loading = false;
    });

    async function handleSubmit() {
        try {
            if (!blog.slug) {
                blog.slug = blog.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            }

            let currentBlogs = $blogs;
            if (currentBlogs.length === 0) {
                await blogs.load();
                currentBlogs = $blogs;
            }

            let updatedBlogs = [...currentBlogs];
            
            if (isEdit) {
                const index = updatedBlogs.findIndex(b => b.id === blog.id);
                if (index !== -1) {
                    updatedBlogs[index] = blog;
                }
            } else {
                updatedBlogs.push(blog);
            }

            await blogs.set(updatedBlogs);
            toast.show(`Blog post ${isEdit ? 'updated' : 'created'} successfully!`, 'success');
            navigate('/?tab=blogs');
        } catch (error) {
            console.error(error);
            toast.show('Failed to save blog post', 'error');
        }
    }

    function execCommand(command: string, value: string | null = null) {
        document.execCommand(command, false, value as string);
    }
</script>

<div class="min-h-screen bg-neutral-100 dark:bg-neutral-950 p-4 md:p-8">
    <div class="max-w-4xl mx-auto space-y-6 animate-workspace-in">
        <!-- Header -->
        <div class="flex items-center gap-4">
            <button 
                on:click={() => navigate('/?tab=blogs')}
                class="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-sm border border-neutral-200 dark:border-white/5"
            >
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
                {isEdit ? 'Edit Article' : 'New Article'}
            </h1>
        </div>

        {#if loading}
            <div class="glass-card p-12 flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
            </div>
        {:else}
            <div class="glass-card p-6 md:p-8 border border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50">
                <form id="blogForm" on:submit|preventDefault={handleSubmit} class="space-y-8">
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="md:col-span-2 space-y-6">
                            <div>
                                <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Title</label>
                                <input 
                                    type="text" 
                                    bind:value={blog.title}
                                    required
                                    class="glass-input w-full text-xl font-bold"
                                    placeholder="Enter article title..."
                                />
                            </div>

                            <div>
                                <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Summary</label>
                                <textarea 
                                    bind:value={blog.description}
                                    required
                                    class="glass-input w-full"
                                    rows="3"
                                    placeholder="Brief summary for search results and cards..."
                                ></textarea>
                            </div>

                            <div>
                                <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Content</label>
                                <div class="border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 shadow-inner">
                                    <!-- Toolbar -->
                                    <div class="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10 p-2 flex flex-wrap gap-1 sticky top-0 z-10">
                                        <button type="button" on:click={() => execCommand('bold')} class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors" title="Bold"><i class="fas fa-bold"></i></button>
                                        <button type="button" on:click={() => execCommand('italic')} class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors" title="Italic"><i class="fas fa-italic"></i></button>
                                        <button type="button" on:click={() => execCommand('underline')} class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors" title="Underline"><i class="fas fa-underline"></i></button>
                                        <div class="w-px h-5 bg-neutral-300 dark:bg-white/10 mx-2 my-auto"></div>
                                        <button type="button" on:click={() => execCommand('formatBlock', '<h2>')} class="px-2 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-sm font-bold text-neutral-600 dark:text-neutral-300 transition-colors">H2</button>
                                        <button type="button" on:click={() => execCommand('formatBlock', '<h3>')} class="px-2 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-sm font-bold text-neutral-600 dark:text-neutral-300 transition-colors">H3</button>
                                        <div class="w-px h-5 bg-neutral-300 dark:bg-white/10 mx-2 my-auto"></div>
                                        <button type="button" on:click={() => execCommand('insertUnorderedList')} class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors"><i class="fas fa-list-ul"></i></button>
                                        <button type="button" on:click={() => execCommand('insertOrderedList')} class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors"><i class="fas fa-list-ol"></i></button>
                                    </div>
                                    <div 
                                        contenteditable="true"
                                        bind:innerHTML={blog.content}
                                        class="min-h-[400px] p-6 focus:outline-none prose dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:text-neutral-900 dark:prose-headings:text-white"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar -->
                        <div class="space-y-6">
                            <div class="bg-neutral-50 dark:bg-white/5 rounded-2xl p-6 border border-neutral-200 dark:border-white/5">
                                <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Publish Date</label>
                                <input 
                                    type="date" 
                                    bind:value={blog.date}
                                    class="glass-input w-full"
                                />
                            </div>

                            <div class="bg-neutral-50 dark:bg-white/5 rounded-2xl p-6 border border-neutral-200 dark:border-white/5">
                                <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Cover Image</label>
                                <ImageUpload
                                    currentImage={blog.image}
                                    onImageUploaded={(url) => blog.image = url}
                                />
                            </div>

                            <div class="bg-neutral-50 dark:bg-white/5 rounded-2xl p-6 border border-neutral-200 dark:border-white/5">
                                <label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Tags</label>
                                <input 
                                    type="text" 
                                    value={blog.tags ? blog.tags.join(', ') : ''}
                                    on:input={(e) => {
                                        if (e.target) {
                                            blog.tags = (e.target as HTMLInputElement).value
                                                .split(',')
                                                .map(t => t.trim())
                                                .filter(Boolean);
                                        }
                                    }}
                                    class="glass-input w-full"
                                    placeholder="Add tags..."
                                />
                                <div class="flex flex-wrap gap-2 mt-3">
                                    {#each blog.tags as tag}
                                        <span class="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-500/20">
                                            #{tag}
                                        </span>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-6 border-t border-neutral-200 dark:border-white/10 flex justify-end gap-4">
                        <button 
                            type="button"
                            on:click={() => navigate('/?tab=blogs')}
                            class="px-6 py-3 rounded-xl font-bold text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-white/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            class="px-8 py-3 rounded-xl font-bold glass-button-primary shadow-xl shadow-orange-500/20"
                        >
                            {isEdit ? 'Save Changes' : 'Publish Post'}
                        </button>
                    </div>
                </form>
            </div>
        {/if}
    </div>
</div>
