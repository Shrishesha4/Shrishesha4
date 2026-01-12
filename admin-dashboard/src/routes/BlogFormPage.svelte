<script lang="ts">
    import { onMount } from 'svelte';
    import { blogs, type Blog } from '$lib/stores/blogs';
    import { navigate } from '$lib/router';
    import { toast } from '$lib/stores/toast';
    import { auth } from '$lib/firebase/config';
    import ImageUpload from '$lib/components/ImageUpload.svelte';
    import { API_BASE_URL } from '$lib/config';

    const path = window.location.pathname;
    const search = window.location.search;
    const isEdit = path.includes('/edit/');
    const isFromRSS = search.includes('from=rss');
    const id = isEdit ? path.split('/edit/')[1] : null;

    let blog = $state<any>({
        id: crypto.randomUUID(),
        title: '',
        content: '',
        description: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        slug: ''
    });
    let loading = $state(true);
    let rssSourceInfo = $state<{ sourceUrl?: string; sourceTitle?: string } | null>(null);

    // LLM generation state
    let llmStyle = $state('');
    let llmLoading = $state(false);
    let regeneratingTitle = $state(false);
    let regeneratingSummary = $state(false);
    let regeneratingContent = $state(false);
    let regeneratingTags = $state(false);

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
        } else if (isFromRSS) {
            // Check for RSS draft data in sessionStorage
            const rssDraft = sessionStorage.getItem('rss-blog-draft');
            if (rssDraft) {
                try {
                    const draftData = JSON.parse(rssDraft);
                    blog.title = draftData.title || '';
                    blog.description = draftData.description || '';
                    blog.content = draftData.content || '';
                    blog.tags = draftData.tags || [];
                    rssSourceInfo = {
                        sourceUrl: draftData.sourceUrl,
                        sourceTitle: draftData.sourceTitle
                    };
                    // Clear the draft after loading
                    sessionStorage.removeItem('rss-blog-draft');
                    toast.show('Blog generated from RSS feed! Review and publish.', 'success');
                } catch (err) {
                    console.error('Error loading RSS draft:', err);
                }
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

    async function generateWithLLM() {
        if (!blog.title) {
            toast.show('Please provide a title to seed the generation', 'error');
            return;
        }

        llmLoading = true;
        try {
            const res = await fetch(`${API_BASE_URL}/generate-blog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blog.title,
                    description: blog.description,
                    style: llmStyle
                })
            });

            const data = await res.json();

            if (!res.ok) {
                const message = data?.error || `Generation failed (status ${res.status})`;
                toast.show(`Generation error: ${message}`, 'error');
                llmLoading = false;
                return;
            }

            const { content, tags } = data;
            
            if (!content) {
                toast.show('No content returned', 'error');
                llmLoading = false;
                return;
            }

            // Put the generated content in the editor
            blog.content = content;
            
            if (tags && Array.isArray(tags)) {
                blog.tags = tags;
            }
            
            if (!blog.description) {
                const firstLine = content.replace(/<[^>]*>/g, '').split('\n').find(Boolean) || '';
                blog.description = firstLine.slice(0, 200);
            }

            toast.show('Generated content inserted into editor', 'success');

        } catch (err: any) {
            console.error(err);
            toast.show(`Network error: ${err?.message || 'Failed to reach server'}`, 'error');
        } finally {
            llmLoading = false;
        }
    }

    async function regenerateTitle() {
        if (!blog.content && !blog.description) {
            toast.show('Add some content or summary first', 'error');
            return;
        }
        regeneratingTitle = true;
        try {
            const res = await fetch(`${API_BASE_URL}/generate-blog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blog.title || 'Generate a title',
                    description: blog.description,
                    content: blog.content,
                    generateOnly: 'title'
                })
            });
            const data = await res.json();
            console.log('Title regenerate response:', data);
            if (res.ok && data.title) {
                blog.title = data.title;
                toast.show('Title regenerated', 'success');
            } else {
                toast.show(data.error || 'No title returned', 'error');
            }
        } catch (err) {
            console.error('Title regenerate error:', err);
            toast.show('Failed to regenerate title', 'error');
        } finally {
            regeneratingTitle = false;
        }
    }

    async function regenerateSummary() {
        if (!blog.content && !blog.title) {
            toast.show('Add a title or content first', 'error');
            return;
        }
        regeneratingSummary = true;
        try {
            const res = await fetch(`${API_BASE_URL}/generate-blog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blog.title,
                    description: blog.description || '',
                    content: blog.content,
                    generateOnly: 'summary'
                })
            });
            const data = await res.json();
            if (res.ok && data.summary) {
                blog.description = data.summary;
                toast.show('Summary regenerated', 'success');
            }
        } catch (err) {
            toast.show('Failed to regenerate summary', 'error');
        } finally {
            regeneratingSummary = false;
        }
    }

    async function regenerateContent() {
        if (!blog.title) {
            toast.show('Add a title first', 'error');
            return;
        }
        regeneratingContent = true;
        try {
            const res = await fetch(`${API_BASE_URL}/generate-blog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blog.title,
                    description: blog.description,
                    content: blog.content,
                    style: llmStyle,
                    generateOnly: 'content'
                })
            });
            const data = await res.json();
            if (res.ok && data.content) {
                blog.content = data.content;
                toast.show('Content regenerated', 'success');
            }
        } catch (err) {
            toast.show('Failed to regenerate content', 'error');
        } finally {
            regeneratingContent = false;
        }
    }

    async function regenerateTags() {
        if (!blog.title && !blog.content) {
            toast.show('Add a title or content first', 'error');
            return;
        }
        regeneratingTags = true;
        try {
            const res = await fetch(`${API_BASE_URL}/generate-blog`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blog.title,
                    description: blog.description,
                    content: blog.content,
                    generateOnly: 'tags'
                })
            });
            const data = await res.json();
            if (res.ok && data.tags) {
                blog.tags = data.tags;
                toast.show('Tags regenerated', 'success');
            }
        } catch (err) {
            toast.show('Failed to regenerate tags', 'error');
        } finally {
            regeneratingTags = false;
        }
    }
</script>

<div class="h-screen w-screen overflow-hidden flex flex-col-reverse bg-neutral-100 dark:bg-neutral-950 p-4 gap-4">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <!-- Bottom Toolbar (Header) -->
    <header class="glass-card h-20 px-6 flex items-center justify-between border-neutral-200 dark:border-white/5 shrink-0 shadow-2xl">
        <div class="flex items-center gap-4">
            <button 
                onclick={() => navigate('/?tab=blogs')}
                class="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm active:scale-95"
            >
                <i class="fas fa-arrow-left"></i>
            </button>
            <div class="hidden sm:block">
                <h1 class="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                    {isEdit ? 'Edit Article' : 'New Article'}
                </h1>
                <p class="text-xs text-neutral-500">Workspace / Blogs</p>
            </div>
        </div>

        <button 
            type="submit"
            form="blogForm"
            class="glass-button glass-button-primary px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-500/30"
        >
            {isEdit ? 'Save' : 'Publish'}
        </button>
    </header>

    <!-- Main Content OS Window -->
    <main class="flex-1 glass-card overflow-hidden flex flex-col border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50">
        {#if loading}
            <div class="flex-1 flex items-center justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
            </div>
            {:else}
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div class="max-w-4xl mx-auto space-y-8 animate-workspace-in">
                    <form id="blogForm" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-8">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="md:col-span-2 space-y-6">
                                <div>
                                    <div class="flex items-center justify-between mb-2 ml-1">
                                        <label class="block text-xs font-black uppercase tracking-widest text-neutral-400">Article Title</label>
                                        <button 
                                            type="button"
                                            onclick={regenerateTitle}
                                            disabled={regeneratingTitle}
                                            class="text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50"
                                            title="Regenerate title"
                                        >
                                            <i class="fas {regeneratingTitle ? 'fa-spinner fa-spin' : 'fa-sync-alt'}"></i>
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        bind:value={blog.title}
                                        required
                                        class="glass-input w-full text-2xl font-black tracking-tight"
                                        placeholder="Title goes here..."
                                    />
                                </div>

                                <div>
                                    <div class="flex items-center justify-between mb-2 ml-1">
                                        <label class="block text-xs font-black uppercase tracking-widest text-neutral-400">Summary</label>
                                        <button 
                                            type="button"
                                            onclick={regenerateSummary}
                                            disabled={regeneratingSummary}
                                            class="text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50"
                                            title="Regenerate summary"
                                        >
                                            <i class="fas {regeneratingSummary ? 'fa-spinner fa-spin' : 'fa-sync-alt'}"></i>
                                        </button>
                                    </div>
                                    <textarea 
                                        bind:value={blog.description}
                                        required
                                        class="glass-input w-full"
                                        rows="3"
                                        placeholder="Brief summary..."
                                    ></textarea>
                                </div>

                                <div>
                                    <div class="flex items-center justify-between mb-2 ml-1">
                                        <label class="block text-xs font-black uppercase tracking-widest text-neutral-400">Content Editor</label>
                                        <button 
                                            type="button"
                                            onclick={regenerateContent}
                                            disabled={regeneratingContent}
                                            class="text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50"
                                            title="Regenerate content"
                                        >
                                            <i class="fas {regeneratingContent ? 'fa-spinner fa-spin' : 'fa-sync-alt'}"></i>
                                        </button>
                                    </div>
                                    <div class="border border-neutral-200 dark:border-white/10 rounded-[2rem] overflow-hidden bg-white dark:bg-neutral-950 shadow-inner">
                                        <div class="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10 p-3 flex flex-wrap gap-1 sticky top-0 z-10">
                                            <button type="button" onclick={() => execCommand('bold')} class="w-10 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-neutral-600 dark:text-neutral-300 transition-colors" title="Bold"><i class="fas fa-bold"></i></button>
                                            <button type="button" onclick={() => execCommand('italic')} class="w-10 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-neutral-600 dark:text-neutral-300 transition-colors" title="Italic"><i class="fas fa-italic"></i></button>
                                            <div class="w-px h-6 bg-neutral-300 dark:bg-white/10 mx-2 my-auto"></div>
                                            <button type="button" onclick={() => execCommand('formatBlock', '<h2>')} class="px-3 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-sm font-black text-neutral-600 dark:text-neutral-300 transition-colors">H2</button>
                                            <button type="button" onclick={() => execCommand('formatBlock', '<h3>')} class="px-3 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-sm font-black text-neutral-600 dark:text-neutral-300 transition-colors">H3</button>
                                            <div class="w-px h-6 bg-neutral-300 dark:bg-white/10 mx-2 my-auto"></div>
                                            <!-- svelte-ignore a11y_consider_explicit_label -->
                                            <button type="button" onclick={() => execCommand('insertUnorderedList')} class="w-10 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-neutral-600 dark:text-neutral-300 transition-colors"><i class="fas fa-list-ul"></i></button>
                                        </div>
                                        <div 
                                            contenteditable="true"
                                            bind:innerHTML={blog.content}
                                            class="min-h-[400px] p-8 focus:outline-none prose dark:prose-invert max-w-none prose-headings:tracking-tighter"
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-6">
                                <div class="glass-card p-6 bg-neutral-50/50 dark:bg-white/5 border-neutral-200/50">
                                    <label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Settings</label>
                                    <div class="space-y-4">
                                        <div>
                                            <span class="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Date</span>
                                            <input type="date" bind:value={blog.date} class="glass-input w-full text-sm" />
                                        </div>
                                        <div>
                                            <span class="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Image</span>
                                            <ImageUpload currentImage={blog.image} onImageUploaded={(url) => blog.image = url} />
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between mb-1">
                                                <span class="block text-[10px] font-bold text-neutral-400 uppercase">Tags</span>
                                                <button 
                                                    type="button"
                                                    onclick={regenerateTags}
                                                    disabled={regeneratingTags}
                                                    class="text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50 text-xs"
                                                    title="Regenerate tags"
                                                >
                                                    <i class="fas {regeneratingTags ? 'fa-spinner fa-spin' : 'fa-sync-alt'}"></i>
                                                </button>
                                            </div>
                                            <input 
                                                type="text" 
                                                value={blog.tags ? blog.tags.join(', ') : ''}
                                                oninput={(e) => {
                                                    if (e.target) {
                                                        blog.tags = (e.target as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                                                    }
                                                }}
                                                class="glass-input w-full text-sm"
                                                placeholder="tag1, tag2..."
                                            />
                                        </div>

                                        <!-- LLM Generation -->
                                        <div class="pt-4 border-t border-neutral-200/30">
                                            <span class="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Generate with LLM (Gemini)</span>
                                            
                                            <label class="block text-[11px] text-neutral-500 mb-1">Tone / Style (optional)</label>
                                            <input type="text" bind:value={llmStyle} placeholder="e.g. conversational, technical, concise" class="glass-input w-full text-sm mb-2" />

                                            <div class="flex items-center gap-3">
                                                <button onclick={generateWithLLM} class="glass-button glass-button-primary px-3 py-1.5" disabled={llmLoading}>
                                                    {#if llmLoading}
                                                        Generating…
                                                    {:else}
                                                        Generate
                                                    {/if}
                                                </button>
                                            </div>

                                            {#if llmLoading}
                                                <div class="text-sm text-neutral-500 mt-2">Generating content…</div>
                                            {/if}
                                            <p class="text-xs text-neutral-400 mt-2">Using server-side Gemini API generation.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        {/if}
    </main>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
    :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); }
</style>