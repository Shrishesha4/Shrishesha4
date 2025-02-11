<script lang="ts">
    
    import { blogs } from '$lib/stores/blogs';
    import { toast } from '$lib/stores/toast';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/firebase/config';
	import ImageUpload from './ImageUpload.svelte';
    
    export let editingBlog: any = null;
    let isCodeView = false;
    let selectedBlogs: string[] = [];
    let allBlogs: typeof $blogs = [];
    let loading = true;
    
    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    goto('/admin/login');
                    return;
                }
                await blogs.load();
                allBlogs = [...$blogs];
                loading = false;
            } catch (err) {
                err = 'Failed to load blogs data';
                loading = false;
            }
        });
    
        return () => unsubscribe();
    });

    let newBlog = {
        id: '',
        title: '',
        content: '',
        description: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        slug: ''
    };

    let tagInput = '';

    function handleTagKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    }

    function addTag() {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !editingBlog.tags.includes(trimmedTag)) {
            editingBlog.tags = [...editingBlog.tags, trimmedTag];
            tagInput = '';
        }
    }

    function removeTag(tag: string) {
        editingBlog.tags = editingBlog.tags.filter((t: string) => t !== tag);
    }

    function generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    async function handleSubmit() {
        try {
            if (!editingBlog.id) {
                editingBlog.id = crypto.randomUUID();
                editingBlog.slug = generateSlug(editingBlog.title);
                const updatedBlogs = [...$blogs, editingBlog];
                await blogs.set(updatedBlogs);
                toast.show('Blog post created successfully!', 'success');
            } else {
                editingBlog.slug = generateSlug(editingBlog.title);
                const updatedBlogs = $blogs.map(blog => 
                    blog.id === editingBlog.id ? editingBlog : blog
                );
                await blogs.set(updatedBlogs);
                toast.show('Blog post updated successfully!', 'success');
            }
            editingBlog = null;
        } catch (error) {
            toast.show('Failed to save blog post', 'error');
        }
    }

    async function handleDelete(blogId: string) {
        try {
            const updatedBlogs = $blogs.filter(blog => blog.id !== blogId);
            await blogs.set(updatedBlogs);
            toast.show('Blog deleted successfully!', 'success');
        } catch (error) {
            toast.show('Failed to delete blog', 'error');
        }
    }

    async function handleDeleteSelected() {
        try {
            const updatedBlogs = $blogs.filter(blog => !selectedBlogs.includes(blog.id));
            await blogs.set(updatedBlogs);
            selectedBlogs = [];
            toast.show('Selected blogs deleted successfully!', 'success');
        } catch (error) {
            toast.show('Failed to delete selected blogs', 'error');
        }
    }

    function toggleSelect(blogId: string) {
        const index = selectedBlogs.indexOf(blogId);
        if (index === -1) {
            selectedBlogs = [...selectedBlogs, blogId];
        } else {
            selectedBlogs = selectedBlogs.filter(id => id !== blogId);
        }
    }

    function execCommand(command: string, value: string | null = null) {
        document.execCommand(command, false, value as string);
    }

    let showImageModal = false;
    let tempImageUrl = '';

    function handleImageInsert() {
        // const url = prompt('Enter image URL:');
        // if (url) {
        //     execCommand('insertImage', url);
        // }
        showImageModal = true;
    }

    function handleImageUploaded(url: string) {
        execCommand('insertImage', url);
        showImageModal = false;
    }

    function handleLinkInsert() {
        const url = prompt('Enter link URL:');
        if (url) {
            execCommand('createLink', url);
        }
    }
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_label_has_associated_control -->
<!-- svelte-ignore a11y_missing_content -->
<div class="space-y-6">
    {#if !editingBlog}
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold"> </h2>
            <div class="flex gap-4">
                {#if selectedBlogs.length > 0}
                    <button
                        on:click={handleDeleteSelected}
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Delete Selected ({selectedBlogs.length})
                    </button>
                {/if}
                <button
                    on:click={() => editingBlog = newBlog}
                    class="px-4 py-2 text-black dark:text-white rounded-lg hover:bg-primary-700"
                >
                    <i class="fas fa-plus mr-2"></i>
                </button>
                
            </div>
        </div>

        <div class="space-y-4">
            {#each $blogs as blog}
                <div class="glass-card flex items-center gap-4 p-4 rounded-lg hover:glass-card-hover md:hover:glass-card-hover">
                    <input
                        type="checkbox"
                        checked={selectedBlogs.includes(blog.id)}
                        on:change={() => toggleSelect(blog.id)}
                        class="w-5 h-5 rounded border-2 border-neutral-300 dark:border-neutral-600 
                               text-primary-600 focus:ring-primary-500
                               checked:bg-primary-600 checked:border-primary-600
                               transition-colors duration-200 ease-in-out
                               cursor-pointer hover:border-primary-500
                               dark:checked:bg-primary-500 dark:checked:border-primary-500
                               dark:focus:ring-primary-400"
                    />
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold">{blog.title}</h3>
                        <p class="text-sm text-neutral-500">{blog.description}</p>
                    </div>
                    <div class="flex gap-2">
                        <button
                            on:click={() => editingBlog = blog}
                            class="p-2 text-blue-600 hover:text-blue-800"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button
                            on:click={() => handleDelete(blog.id)}
                            class="p-2 text-red-600 hover:text-red-800"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-4">
                <button
                    on:click={() => editingBlog = null}
                    class="p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    title="Back to List"
                >
                    <i class="fas fa-arrow-left text-xl"></i>
                </button>
                <h2 class="text-2xl font-bold">{editingBlog.id ? 'Edit Blog' : 'New Blog'}</h2>
            </div>
            <button
                type="submit"
                form="blogForm"
                class="px-4 py-2 glass-button transition-all duration-200 hover:scale-105 text-black dark:text-white border border-gray-400/60 dark:border-white dark:border-bg-primary rounded-lg"
            >
                <i class="fas fa-save mr-2"></i>
                {editingBlog.id ? 'Update' : 'Create'}
            </button>
        </div>
        <form id="blogForm" on:submit|preventDefault={handleSubmit} class="glass-card space-y-6 px-4 py-4 rounded-xl">
            <div>
                <label class="block text-sm font-medium mb-2">Title</label>
                <input
                    type="text"
                    bind:value={editingBlog.title}
                    required
                    class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
            </div>

            <div>
                <label class="block text-sm font-medium mb-2">Description</label>
                <textarea
                    bind:value={editingBlog.description}
                    required
                    rows="3"
                    class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                ></textarea>
            </div>

            <div class="">
                <label class="block text-sm font-medium mb-2 ">Content</label>
                <div class="border rounded-lg bg-white dark:bg-neutral-800 border-neutral-400 dark:border-neutral-700 overflow-hidden">
                    <div class="bg-neutral-100 dark:bg-neutral-700 p-2 border-b dark:border-neutral-600 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div class="flex items-center gap-2 min-w-max">
                            <button
                                type="button"
                                on:click={() => execCommand('formatBlock', '<p>')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Paragraph"
                            >
                                <i class="fas fa-paragraph"></i>
                            </button>
                            <!-- Headings -->
                            <button
                                type="button"
                                on:click={() => execCommand('formatBlock', '<h1>')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Heading 1"
                            >
                                <i class="fas fa-heading"></i><span class="text-xs">1</span>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('formatBlock', '<h2>')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Heading 2"
                            >
                                <i class="fas fa-heading"></i><span class="text-xs">2</span>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('formatBlock', '<h3>')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Heading 3"
                            >
                                <i class="fas fa-heading"></i><span class="text-xs">3</span>
                            </button>

                            <div class="w-px h-6 bg-neutral-300 dark:bg-neutral-600 my-auto"></div>

                            <!-- Text Formatting -->
                            <button
                                type="button"
                                on:click={() => execCommand('bold')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Bold"
                                >
                                    <i class="fas fa-bold"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('italic')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Italic"
                            >
                                <i class="fas fa-italic"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('underline')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Underline"
                            >
                                <i class="fas fa-underline"></i>
                            </button>
                        
                            <div class="w-px h-6 bg-neutral-300 dark:bg-neutral-600 my-auto"></div>
                            <!-- Additional Text Formatting -->
                            <button
                                type="button"
                                on:click={() => execCommand('strikeThrough')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Strike Through"
                            >
                                <i class="fas fa-strikethrough"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('subscript')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Subscript"
                            >
                                <i class="fas fa-subscript"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('superscript')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Superscript"
                            >
                                <i class="fas fa-superscript"></i>
                            </button>
                            <div class="w-px h-6 bg-neutral-300 dark:bg-neutral-600 my-auto"></div>
                           
                            <!-- Lists -->
                            <button
                                type="button"
                                on:click={() => execCommand('insertUnorderedList')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Bullet List"
                            >
                                <i class="fas fa-list-ul"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('insertOrderedList')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Numbered List"
                            >
                                <i class="fas fa-list-ol"></i>
                            </button>
                            <div class="w-px h-6 bg-neutral-300 dark:bg-neutral-600 my-auto"></div>
                            
                            <!-- Indentation -->
                            <button
                                type="button"
                                on:click={() => execCommand('indent')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Increase Indent"
                            >
                                <i class="fas fa-indent"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('outdent')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Decrease Indent"
                            >
                                <i class="fas fa-outdent"></i>
                            </button>

                            <div class="w-px h-6 bg-neutral-300 dark:bg-neutral-600 my-auto"></div>

                            <!-- Alignment -->
                            <button
                                type="button"
                                on:click={() => execCommand('justifyLeft')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Align Left"
                            >
                                <i class="fas fa-align-left"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('justifyCenter')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Align Center"
                            >
                                <i class="fas fa-align-center"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('justifyRight')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Align Right"
                            >
                                <i class="fas fa-align-right"></i>
                            </button>
                            
                            <div class="w-px h-6 bg-neutral-300 dark:bg-neutral-600 my-auto"></div>
                            
                            <!-- Media -->
                            <button
                                type="button"
                                on:click={handleImageInsert}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Insert Image"
                            >
                                <i class="fas fa-image"></i>
                            </button>
                            <button
                                type="button"
                                on:click={handleLinkInsert}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Insert Link"
                            >
                                <i class="fas fa-link"></i>
                            </button>
                            <!-- Line breaks -->
                            <button
                                type="button"
                                on:click={() => execCommand('insertHorizontalRule')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Horizontal Line"
                            >
                                <i class="fas fa-minus"></i>
                            </button>
                            <button
                                type="button"
                                on:click={() => execCommand('insertLineBreak')}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded"
                                title="Line Break"
                            >
                                <i class="fas fa-level-down-alt fa-rotate-90"></i>
                            </button>

                            <div class="w-px h-6 bg-neutral-300 dark:bg-neutral-600 my-auto ml-auto"></div>
                            
                            <button
                                type="button"
                                on:click={() => isCodeView = !isCodeView}
                                class="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
                                title={isCodeView ? "Switch to Visual Editor" : "Switch to HTML Code"}
                            >
                                <i class="fas {isCodeView ? 'fa-eye' : 'fa-code'}"></i>
                            </button>
                        </div>
                    </div>
                    {#if isCodeView}
                        <textarea
                            bind:value={editingBlog.content}
                            class="w-full min-h-[400px] p-4 focus:outline-none font-mono text-sm bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-100"
                            spellcheck="false"
                            placeholder="Enter HTML content here..."
                        ></textarea>
                    {:else}
                        <div
                            contenteditable="true"
                            bind:innerHTML={editingBlog.content}
                            class="min-h-[400px] p-4 focus:outline-none prose dark:prose-invert max-w-none"
                        ></div>
                    {/if}
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium mb-2">Blog Image</label>
                <ImageUpload
                    currentImage={editingBlog.image}
                    onImageUploaded={(url) => editingBlog.image = url}
                />
            </div>

            <div>
                <label class="block text-sm font-medium mb-2">Tags</label>
                <div class="flex gap-2 mb-2">
                    {#each editingBlog.tags as tag}
                        <span class="glass-button px-2 py-1 rounded-full text-sm flex items-center gap-1">
                            {tag}
                            <button
                                type="button"
                                on:click={() => removeTag(tag)}
                                class="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                            >
                                ×
                            </button>
                        </span>
                    {/each}
                </div>
                <div class="flex gap-2">
                    <input
                        type="text"
                        bind:value={tagInput}
                        on:keydown={handleTagKeydown}
                        placeholder="Add a tag"
                        class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                        type="button"
                        on:click={addTag}
                        class="glass-button px-4 py-2 mt-2 transition-all duration-200 hover:scale-105 border border-black dark:border-gray-700/30 rounded-lg"
                    >
                        Add
                    </button>
                </div>
            </div>
            <div class="flex justify-center">
                <button
                    type="submit"
                    class="glass-button hover:scale-105 transition-all duration-200 px-6 py-2 border border-gray-400/60 dark:border-gray-700/30 text-black dark:text-white rounded-lg"
                >
                    {editingBlog.id ? 'Update Blog Post' : 'Create Blog Post'}
                </button>
            </div>
        </form>
    {/if}
    {#if showImageModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Insert Image</h3>
                <button
                    type="button"
                    on:click={() => showImageModal = false}
                    class="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <ImageUpload
                currentImage={tempImageUrl}
                onImageUploaded={handleImageUploaded}
            />
        </div>
    </div>
{/if}
</div>
