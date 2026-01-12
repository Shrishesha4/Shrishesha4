<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { rssFeeds, type RSSFeedSource, type RSSFeedItem } from '$lib/stores/rssFeeds';
    import { toast } from '$lib/stores/toast';
    import { navigate } from '$lib/router';
    import { API_BASE_URL } from '$lib/config';
    import LoadingSpinner from './LoadingSpinner.svelte';

    let feedSources: RSSFeedSource[] = $state([]);
    let feedItems: RSSFeedItem[] = $state([]);
    let loading = $state(true);
    let loadingItems = $state(false);
    let selectedSource: string = $state('all');
    let showAddForm = $state(false);
    let showManageFeeds = $state(false);
    let generatingBlog = $state<string | null>(null);
    let hasFetchedOnce = $state(false);
    let visibleCount = $state(10); // Lazy load: show 10 items initially
    let abortController: AbortController | null = null;
    let searchQuery = $state('');

    // New feed form
    let newFeedTitle = $state('');
    let newFeedUrl = $state('');
    
    // Get filtered items based on search
    function getFilteredItems() {
        if (!searchQuery.trim()) return feedItems;
        const query = searchQuery.toLowerCase();
        return feedItems.filter(item => 
            item.title?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.sourceTitle?.toLowerCase().includes(query)
        );
    }
    
    // Get visible items (filtered + lazy loaded)
    function getVisibleItems() {
        const filtered = getFilteredItems();
        return filtered.slice(0, visibleCount);
    }
    
    // Get total filtered count
    function getFilteredCount() {
        return getFilteredItems().length;
    }

    onMount(async () => {
        await rssFeeds.load();
        loading = false;
    });
    
    onDestroy(() => {
        if (abortController) {
            abortController.abort();
        }
    });

    $effect(() => {
        if ($rssFeeds) {
            feedSources = [...$rssFeeds];
        }
    });

    // Load more items for infinite scroll
    function loadMore() {
        visibleCount = Math.min(visibleCount + 10, getFilteredCount());
    }

    async function fetchFeedItems() {
        // Cancel any ongoing fetch
        if (abortController) {
            abortController.abort();
        }
        abortController = new AbortController();
        
        loadingItems = true;
        feedItems = [];
        visibleCount = 10; // Reset visible count
        
        const enabledFeeds = selectedSource === 'all' 
            ? feedSources.filter(f => f.enabled)
            : feedSources.filter(f => f.id === selectedSource && f.enabled);
        
        if (enabledFeeds.length === 0) {
            loadingItems = false;
            hasFetchedOnce = true;
            return;
        }

        try {
            // Fetch feeds one by one with timeout to avoid hanging
            const allItems: RSSFeedItem[] = [];
            
            for (const feed of enabledFeeds) {
                if (abortController.signal.aborted) break;
                
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout per feed
                    
                    const res = await fetch(
                        `${API_BASE_URL}/rss-proxy?url=${encodeURIComponent(feed.url)}`,
                        { signal: controller.signal }
                    );
                    clearTimeout(timeoutId);
                    
                    if (!res.ok) {
                        console.warn(`Failed to fetch ${feed.title}: ${res.statusText}`);
                        continue;
                    }
                    
                    const data = await res.json();
                    const items = (data.items || []).map((item: any) => ({
                        ...item,
                        source: feed.url,
                        sourceTitle: feed.title
                    }));
                    
                    allItems.push(...items);
                    
                    // Update UI progressively as feeds come in
                    const sorted = [...allItems].sort((a, b) => {
                        const dateA = new Date(a.pubDate || 0).getTime();
                        const dateB = new Date(b.pubDate || 0).getTime();
                        return dateB - dateA;
                    });
                    feedItems = sorted.slice(0, 100);
                    
                } catch (err: any) {
                    if (err.name === 'AbortError') {
                        console.warn(`Timeout fetching ${feed.title}`);
                    } else {
                        console.error(`Error fetching ${feed.title}:`, err);
                    }
                }
            }
            
            hasFetchedOnce = true;
        } catch (err) {
            console.error('Error fetching RSS feeds:', err);
            toast.show('Failed to fetch RSS feeds', 'error');
        } finally {
            loadingItems = false;
        }
    }

    async function handleAddFeed() {
        if (!newFeedTitle.trim() || !newFeedUrl.trim()) {
            toast.show('Please fill in both title and URL', 'error');
            return;
        }

        // Validate URL first
        try {
            new URL(newFeedUrl.trim());
        } catch {
            toast.show('Invalid URL format', 'error');
            return;
        }
        
        // Now try to add to Firebase
        try {
            await rssFeeds.add({
                title: newFeedTitle.trim(),
                url: newFeedUrl.trim(),
                enabled: true
            });

            newFeedTitle = '';
            newFeedUrl = '';
            showAddForm = false;
            toast.show('RSS feed added successfully', 'success');
            
            // Refresh feed items if we've fetched before
            if (hasFetchedOnce) {
                fetchFeedItems();
            }
        } catch (err: any) {
            console.error('Error adding feed:', err);
            toast.show(err?.message || 'Failed to add RSS feed', 'error');
        }
    }

    async function handleRemoveFeed(feedId: string) {
        if (!confirm('Are you sure you want to remove this feed?')) return;
        
        try {
            await rssFeeds.remove(feedId);
            toast.show('RSS feed removed', 'success');
            if (hasFetchedOnce) {
                fetchFeedItems();
            }
        } catch (err: any) {
            console.error('Error removing feed:', err);
            toast.show(err?.message || 'Failed to remove feed', 'error');
        }
    }

    async function handleToggleFeed(feedId: string) {
        try {
            await rssFeeds.toggle(feedId);
            // Don't auto-refresh on toggle, just update the UI
        } catch (err: any) {
            console.error('Error toggling feed:', err);
            toast.show(err?.message || 'Failed to toggle feed', 'error');
        }
    }

    async function generateBlogFromItem(item: RSSFeedItem) {
        generatingBlog = item.link;
        
        try {
            const res = await fetch(`${API_BASE_URL}/generate-blog-from-rss`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: item.title,
                    description: item.description,
                    sourceUrl: item.link,
                    sourceTitle: item.sourceTitle,
                    content: item.content || item.description
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to generate blog');
            }

            const data = await res.json();
            
            // Navigate to blog form with pre-filled data
            // Store the generated content in sessionStorage
            sessionStorage.setItem('rss-blog-draft', JSON.stringify({
                title: item.title,
                description: item.description?.replace(/<[^>]*>/g, '').slice(0, 200) || '',
                content: data.content,
                sourceUrl: item.link,
                sourceTitle: item.sourceTitle
            }));
            
            navigate('/blogs/new?from=rss');
            
        } catch (err: any) {
            console.error('Error generating blog:', err);
            toast.show(err.message || 'Failed to generate blog from RSS item', 'error');
        } finally {
            generatingBlog = null;
        }
    }

    function formatDate(dateStr: string) {
        if (!dateStr) return 'Unknown date';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateStr;
        }
    }

    function stripHtml(html: string) {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').slice(0, 150) + '...';
    }
</script>

<div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h2 class="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <i class="fas fa-rss text-orange-500"></i>
                RSS Feed Browser
            </h2>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">
                Browse news and generate blog posts with AI
            </p>
        </div>
        <div class="flex gap-2">
            <button
                onclick={() => showManageFeeds = !showManageFeeds}
                class="glass-button-outline px-4 py-2 rounded-xl text-sm flex items-center gap-2"
            >
                <i class="fas fa-cog"></i>
                <span class="hidden sm:inline">Manage Feeds</span>
            </button>
            <button
                onclick={() => fetchFeedItems()}
                disabled={loadingItems}
                class="glass-button-outline px-4 py-2 rounded-xl text-sm flex items-center gap-2"
            >
                <i class="fas fa-sync-alt {loadingItems ? 'animate-spin' : ''}"></i>
                <span class="hidden sm:inline">Refresh</span>
            </button>
        </div>
    </div>

    <!-- Manage Feeds Panel -->
    {#if showManageFeeds}
        <div class="glass-card p-4 space-y-4 bg-neutral-50/50 dark:bg-white/5 border-neutral-200/50">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-neutral-900 dark:text-white">RSS Feed Sources</h3>
                <button
                    onclick={() => showAddForm = !showAddForm}
                    class="glass-button glass-button-primary px-3 py-1.5 text-sm flex items-center gap-2"
                >
                    <i class="fas fa-plus"></i> Add Feed
                </button>
            </div>

            <!-- Add Feed Form -->
            {#if showAddForm}
                <div class="flex flex-col sm:flex-row gap-3 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-white/10">
                    <input
                        type="text"
                        bind:value={newFeedTitle}
                        placeholder="Feed Title (e.g., TechCrunch)"
                        class="glass-input flex-1 text-sm"
                    />
                    <input
                        type="url"
                        bind:value={newFeedUrl}
                        placeholder="RSS URL (e.g., https://example.com/rss.xml)"
                        class="glass-input flex-[2] text-sm"
                    />
                    <div class="flex gap-2">
                        <button
                            onclick={handleAddFeed}
                            class="glass-button glass-button-primary px-4 py-2 text-sm"
                        >
                            Add
                        </button>
                        <button
                            onclick={() => { showAddForm = false; newFeedTitle = ''; newFeedUrl = ''; }}
                            class="glass-button-outline px-4 py-2 rounded-xl text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            {/if}

            <!-- Feed List -->
            <div class="grid gap-2">
                {#each feedSources as feed}
                    <div class="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-white/10">
                        <div class="flex items-center gap-3">
                            <button
                                onclick={() => handleToggleFeed(feed.id)}
                                aria-label={feed.enabled ? `Disable ${feed.title}` : `Enable ${feed.title}`}
                                class="w-10 h-6 rounded-full transition-colors relative {feed.enabled ? 'bg-orange-500' : 'bg-neutral-300 dark:bg-neutral-700'}"
                            >
                                <span class="absolute top-0.5 transition-transform w-5 h-5 bg-white rounded-full shadow {feed.enabled ? 'translate-x-4' : 'translate-x-0.5'}"></span>
                            </button>
                            <div>
                                <p class="font-medium text-neutral-900 dark:text-white text-sm">{feed.title}</p>
                                <p class="text-xs text-neutral-400 truncate max-w-[200px] sm:max-w-[400px]">{feed.url}</p>
                            </div>
                        </div>
                        <button
                            onclick={() => handleRemoveFeed(feed.id)}
                            aria-label={`Remove ${feed.title}`}
                            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Source Filter -->
    <div class="flex flex-wrap gap-2">
        <button
            onclick={() => { selectedSource = 'all'; if (hasFetchedOnce) fetchFeedItems(); }}
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all {selectedSource === 'all' 
                ? 'bg-orange-500 text-white' 
                : 'bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/20'}"
        >
            All Sources
        </button>
        {#each feedSources.filter(f => f.enabled) as feed}
            <button
                onclick={() => { selectedSource = feed.id; if (hasFetchedOnce) fetchFeedItems(); }}
                class="px-4 py-2 rounded-xl text-sm font-medium transition-all {selectedSource === feed.id 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/20'}"
            >
                {feed.title}
            </button>
        {/each}
    </div>
    
    <!-- Search Bar (only show when we have items) -->
    {#if feedItems.length > 0}
        <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"></i>
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search articles by title, description, or source..."
                class="glass-input w-full pl-11 pr-4 py-3 text-sm"
                oninput={() => visibleCount = 10}
            />
            {#if searchQuery}
                <button
                    onclick={() => { searchQuery = ''; visibleCount = 10; }}
                    aria-label="Clear search"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                    <i class="fas fa-times"></i>
                </button>
            {/if}
        </div>
        {#if searchQuery}
            <p class="text-sm text-neutral-500 dark:text-neutral-400">
                Found {getFilteredCount()} results for "{searchQuery}"
            </p>
        {/if}
    {/if}

    <!-- Feed Items -->
    {#if loading}
        <div class="flex justify-center py-12">
            <LoadingSpinner />
        </div>
    {:else if !hasFetchedOnce && feedItems.length === 0}
        <!-- Initial state - prompt user to fetch -->
        <div class="text-center py-12">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4">
                <i class="fas fa-rss text-2xl text-orange-500"></i>
            </div>
            <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">Ready to Browse</h3>
            <p class="text-neutral-500 dark:text-neutral-400 mb-4 max-w-sm mx-auto">
                Click the button below to load articles from {feedSources.filter(f => f.enabled).length} enabled feed sources.
            </p>
            <button
                onclick={() => fetchFeedItems()}
                disabled={loadingItems}
                class="glass-button glass-button-primary px-6 py-3 text-sm flex items-center gap-2 mx-auto"
            >
                {#if loadingItems}
                    <i class="fas fa-spinner animate-spin"></i>
                    Loading...
                {:else}
                    <i class="fas fa-download"></i>
                    Load RSS Feeds
                {/if}
            </button>
        </div>
    {:else if loadingItems && feedItems.length === 0}
        <div class="flex flex-col items-center justify-center py-12 gap-3">
            <LoadingSpinner />
            <p class="text-sm text-neutral-500 dark:text-neutral-400">Fetching feeds...</p>
        </div>
    {:else if feedItems.length === 0}
        <div class="text-center py-12 text-neutral-500 dark:text-neutral-400">
            <i class="fas fa-inbox text-4xl mb-4 opacity-50"></i>
            <p>No feed items found. Try enabling more feeds or check your feed URLs.</p>
        </div>
    {:else}
        <div class="grid gap-3">
            {#each getVisibleItems() as item}
                <div class="glass-card p-4 hover:border-orange-500/30 transition-all duration-300 group">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-xs font-medium px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                    {item.sourceTitle}
                                </span>
                                <span class="text-xs text-neutral-400">
                                    {formatDate(item.pubDate)}
                                </span>
                            </div>
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="text-lg font-bold text-neutral-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors line-clamp-2"
                            >
                                {item.title}
                            </a>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                                {stripHtml(item.description)}
                            </p>
                        </div>

                        <!-- Action -->
                        <div class="flex sm:flex-col gap-2 shrink-0">
                            <a 
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="glass-button-outline px-3 py-2 rounded-xl text-sm flex items-center gap-2 justify-center"
                            >
                                <i class="fas fa-external-link-alt"></i>
                                <span class="sm:hidden">Read</span>
                            </a>
                            <button
                                onclick={() => generateBlogFromItem(item)}
                                disabled={generatingBlog === item.link}
                                class="glass-button glass-button-primary px-3 py-2 text-sm flex items-center gap-2 justify-center disabled:opacity-50"
                            >
                                {#if generatingBlog === item.link}
                                    <i class="fas fa-spinner animate-spin"></i>
                                    <span class="sm:hidden">Generating...</span>
                                {:else}
                                    <i class="fas fa-magic"></i>
                                    <span class="sm:hidden">Generate Blog</span>
                                {/if}
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        
        <!-- Load More Button -->
        {#if visibleCount < getFilteredCount()}
            <div class="flex justify-center pt-4">
                <button
                    onclick={loadMore}
                    class="glass-button-outline px-6 py-2 rounded-xl text-sm flex items-center gap-2"
                >
                    <i class="fas fa-chevron-down"></i>
                    Load More ({getFilteredCount() - visibleCount} remaining)
                </button>
            </div>
        {/if}
        
        <!-- Loading indicator while fetching more -->
        {#if loadingItems && feedItems.length > 0}
            <div class="flex justify-center py-4">
                <div class="flex items-center gap-2 text-sm text-neutral-500">
                    <i class="fas fa-spinner animate-spin"></i>
                    Fetching more feeds...
                </div>
            </div>
        {/if}
    {/if}
</div>
