<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Blog } from '$lib/stores/blogs';
	import ImageUpload from './ImageUpload.svelte';

    export let show = false;
    export let blogData: any = null;
    
    const dispatch = createEventDispatcher();
    
    let blog: any = {
        id: '',
        title: '',
        content: '',
        description: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        slug: ''
    };

    $: if (show) {
        if (blogData) {
            blog = JSON.parse(JSON.stringify(blogData));
        } else {
            blog = {
                id: crypto.randomUUID(),
                title: '',
                content: '',
                description: '',
                image: '',
                date: new Date().toISOString().split('T')[0],
                tags: [],
                slug: ''
            };
        }
    }

    function handleSubmit() {
        // Auto-generate slug if missing
        if (!blog.slug) {
            blog.slug = blog.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        dispatch('save', blog);
        show = false;
    }

    function handleClose() {
        show = false;
        dispatch('close');
    }

    function execCommand(command: string, value: string | null = null) {
        document.execCommand(command, false, value as string);
    }
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<!-- svelte-ignore a11y_missing_content -->
<!-- svelte-ignore a11y_consider_explicit_label -->
{#if show}
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all duration-300">
        <div class="glass-card w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden animate-workspace-in border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-2xl">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-neutral-200 dark:border-white/10 flex justify-between items-center bg-neutral-50 dark:bg-white/5">
                <h2 class="text-xl font-bold text-neutral-900 dark:text-white">
                    {blogData ? 'Edit Blog Post' : 'New Blog Post'}
                </h2>
                <button on:click={handleClose} class="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                    <i class="fas fa-times text-lg"></i>
                </button>
            </div>

            <!-- Scrollable Body -->
            <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
                <form id="blogForm" on:submit|preventDefault={handleSubmit} class="space-y-6">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Title</label>
                            <input 
                                type="text" 
                                bind:value={blog.title}
                                required
                                class="glass-input w-full"
                                placeholder="Post Title"
                            />
                        </div>
                        <div>
                            <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Publish Date</label>
                            <input 
                                type="date" 
                                bind:value={blog.date}
                                class="glass-input w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Short Description</label>
                        <textarea 
                            bind:value={blog.description}
                            required
                            class="glass-input w-full"
                            rows="2"
                            placeholder="Brief summary..."
                        ></textarea>
                    </div>

                    <!-- Rich Text Editor Toolbar -->
                    <div>
                        <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Content</label>
                        <div class="border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950">
                            <div class="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10 p-2 flex flex-wrap gap-1">
                                <button type="button" on:click={() => execCommand('bold')} class="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded" title="Bold"><i class="fas fa-bold"></i></button>
                                <button type="button" on:click={() => execCommand('italic')} class="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded" title="Italic"><i class="fas fa-italic"></i></button>
                                <button type="button" on:click={() => execCommand('underline')} class="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded" title="Underline"><i class="fas fa-underline"></i></button>
                                <div class="w-px h-6 bg-neutral-300 dark:bg-white/20 mx-1 my-auto"></div>
                                <button type="button" on:click={() => execCommand('formatBlock', '<h2>')} class="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded font-bold text-sm">H2</button>
                                <button type="button" on:click={() => execCommand('formatBlock', '<h3>')} class="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded font-bold text-sm">H3</button>
                                <div class="w-px h-6 bg-neutral-300 dark:bg-white/20 mx-1 my-auto"></div>
                                <button type="button" on:click={() => execCommand('insertUnorderedList')} class="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded"><i class="fas fa-list-ul"></i></button>
                                <button type="button" on:click={() => execCommand('insertOrderedList')} class="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded"><i class="fas fa-list-ol"></i></button>
                            </div>
                            <div 
                                contenteditable="true"
                                bind:innerHTML={blog.content}
                                class="min-h-[300px] p-4 focus:outline-none prose dark:prose-invert max-w-none"
                            ></div>
                        </div>
                    </div>

                    <div>
                        <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Cover Image</label>
                        <ImageUpload
                            currentImage={blog.image}
                            onImageUploaded={(url) => blog.image = url}
                        />
                    </div>

                    <div>
                        <label class="block mb-1.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300">Tags</label>
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
                            placeholder="tech, news, update..."
                        />
                    </div>
                </form>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 flex justify-end gap-3">
                <button 
                    type="button"
                    on:click={handleClose}
                    class="px-5 py-2.5 rounded-xl font-medium text-neutral-600 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-white/10 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    form="blogForm"
                    class="px-5 py-2.5 rounded-xl font-medium glass-button-primary shadow-lg shadow-orange-500/20"
                >
                    {blogData ? 'Save Changes' : 'Create Post'}
                </button>
            </div>
        </div>
    </div>
{/if}
