<script lang="ts">
    import { blogs, type Blog } from '$lib/stores/blogs';
    import { page } from '$app/stores';
    import { onMount, tick } from 'svelte'; // Import tick
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import TextToSpeech from '$lib/components/TextToSpeech.svelte';

    let currentBlog = $state<Blog | undefined>(undefined);
    let loading = $state(true);
    let readerMode = $state(false);
    let contentRef = $state<HTMLElement>();
    let speechText = $state('');
    let isPlaying = $state(false);
    let darkMode = $state(false);
    
    // Map of character start index -> the specific span element for that word
    let wordSpans = $state<{ start: number; end: number; element: HTMLElement }[]>([]);
    let currentHighlight = $state<HTMLElement | null>(null);
    let isPrepared = $state(false);

    // Initialize dark mode from system preference or localStorage
    function initDarkMode() {
        const stored = localStorage.getItem('blog-dark-mode');
        if (stored !== null) {
            darkMode = stored === 'true';
        } else {
            darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        applyDarkMode();
    }

    function applyDarkMode() {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    function toggleDarkMode() {
        darkMode = !darkMode;
        localStorage.setItem('blog-dark-mode', String(darkMode));
        applyDarkMode();
    }

    // We do not use $: for prepareSpeechData because on mobile, 
    // contentRef might exist but innerHTML might not be rendered yet.
    // We trigger it manually after mount/update.

    async function prepareSpeechData() {
        if (!contentRef) return;

        // Wait for the next frame to ensure DOM is fully painted
        await tick();
        
        speechText = '';
        wordSpans = [];
        
        // Reset current highlights
        if (currentHighlight) {
            currentHighlight.classList.remove('tts-highlight');
            currentHighlight = null;
        }

        const walker = document.createTreeWalker(contentRef, NodeFilter.SHOW_TEXT);
        const nodesToProcess: Node[] = [];
        let node = walker.nextNode();
        while (node) {
            // Ignore script/style tags or empty nodes
            if (node.parentElement?.tagName !== 'SCRIPT' && node.parentElement?.tagName !== 'STYLE' && node.textContent?.trim()) {
                nodesToProcess.push(node);
            }
            node = walker.nextNode();
        }

        // Mobile TTS engines normalize whitespace. 
        // We build the speechText string to match that normalization.
        let currentGlobalIndex = 0;

        for (const textNode of nodesToProcess) {
            const text = textNode.textContent || '';
            
            // Split by whitespace to identify words
            // We normalize spaces to single spaces to align better with TTS charIndex
            const words = text.split(/(\s+)/); 
            
            const fragment = document.createDocumentFragment();
            
            words.forEach(word => {
                if (!word) return;

                // Check if it is purely whitespace
                if (/^\s+$/.test(word)) {
                    // Append a single space to the spoken text regardless of actual DOM spacing
                    // This aligns with how TTS engines usually read
                    speechText += ' '; 
                    fragment.appendChild(document.createTextNode(' ')); 
                } else {
                    // It's a word
                    const span = document.createElement('span');
                    span.textContent = word;
                    span.className = 'tts-word transition-colors duration-100 rounded-sm'; 
                    
                    const start = currentGlobalIndex;
                    speechText += word;
                    currentGlobalIndex = speechText.length; // Update index
                    const end = currentGlobalIndex;
                    
                    wordSpans.push({ start, end, element: span });
                    fragment.appendChild(span);
                }
            });
            
            // Replace the raw text node with our span-wrapped fragment
            if (textNode.parentNode) {
                textNode.parentNode.replaceChild(fragment, textNode);
            }
        }
        
        isPrepared = true;
    }

    onMount(async () => {
        initDarkMode();
        try {
            // Load blogs and wait for data to be available
            const blogsList = await blogs.load();
            currentBlog = blogsList.find(blog => blog.slug === $page.params.slug);
        } finally {
            loading = false;
            // Wait for Svelte to render the HTML content into contentRef
            await tick();
            prepareSpeechData();
        }
    });

    function toggleReaderMode() {
        readerMode = !readerMode;
    }

    function handleSpeech(e: SpeechSynthesisEvent) {
        if (!wordSpans.length) return;
        
        const { charIndex } = e;
        
        // Remove previous highlight
        if (currentHighlight) {
            currentHighlight.classList.remove('tts-highlight');
            currentHighlight = null;
        }

        // Find the matching span
        // Add a small tolerance for mobile TTS engine inconsistencies
        const match = wordSpans.find(s => charIndex >= s.start && charIndex < s.end);

        if (match) {
            const el = match.element;
            el.classList.add('tts-highlight');
            currentHighlight = el;
            
            // Scroll behavior
            // Only scroll if the element is not fully visible to avoid jumping
            requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const isVisible = (rect.top >= 0 && rect.top <= window.innerHeight) && 
                                  (rect.bottom >= 0 && rect.bottom <= window.innerHeight);
                
                if (!isVisible) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    }
</script>

{#if loading}
    <LoadingSpinner />
{:else if currentBlog}
    <article class="min-h-screen bg-white dark:bg-neutral-950 pt-4 p-4 md:pt-20 md:p-8 transition-all duration-500 ease-in-out">
        <!-- Full width header with title -->
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between mb-8">
                <a href="/blogs" class="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    <i class="fas fa-chevron-left mr-2"></i>
                    Posts
                </a>
                
                <div class="flex items-center gap-2">
                    <!-- Dark Mode Toggle -->
                    <button 
                        onclick={toggleDarkMode}
                        class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
                        title={darkMode ? "Light Mode" : "Dark Mode"}
                        aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        <i class="fas {darkMode ? 'fa-sun' : 'fa-moon'} text-xl"></i>
                    </button>
                    
                    <!-- Reader Mode Toggle -->
                    <button 
                        onclick={toggleReaderMode}
                        class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
                        title={readerMode ? "Exit Reader Mode" : "Enter Reader Mode"}
                        aria-label={readerMode ? "Exit Reader Mode" : "Enter Reader Mode"}
                    >
                        <i class="fas {readerMode ? 'fa-book-open' : 'fa-book'} text-xl"></i>
                    </button>
                </div>
            </div>

            <header class="mb-8 {readerMode ? 'text-center' : ''}">
                <h1 class="text-4xl md:text-5xl font-bold mb-6 leading-tight text-neutral-900 dark:text-neutral-100">
                    {currentBlog.title}
                </h1>
                <div class="flex items-center {readerMode ? 'justify-center' : 'justify-between'} gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div class="flex flex-wrap gap-2 items-center">
                        {#if !readerMode}
                            {#each currentBlog.tags as tag}
                                <span class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm flex-shrink-0">
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
                <div class="w-full md:h-[500px] overflow-hidden rounded-2xl mb-12 shadow-2xl">
                    <img 
                        src={currentBlog.image} 
                        alt={currentBlog.title}
                        class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        loading="eager"
                    />
                </div>
            {/if}
        </div>

        <!-- Constrained width content area -->
        <div class="{readerMode ? 'max-w-2xl' : 'max-w-3xl'} mx-auto transition-all duration-500 ease-in-out">
            <div class="prose dark:prose-invert max-w-none {readerMode ? 'prose-lg md:prose-xl leading-relaxed' : 'prose-lg'} marker:text-primary-500">
                <!-- bind:this triggers reactivity, but we handle logic in onMount/tick -->
                <div bind:this={contentRef} class:tts-blur-mode={isPlaying} class="transition-all duration-300">
                    {@html currentBlog.content}
                </div>
            </div>
            
            <TextToSpeech text={speechText} onspeech={handleSpeech} bind:isPlaying />
        </div>
    </article>
{:else}
    <div class="min-h-screen flex items-center justify-center">
        <p class="text-neutral-600 dark:text-neutral-400 text-xl">Blog post not found</p>
    </div>
{/if}

<style>
    /* Global styles */
    :global(html) {
        scroll-behavior: smooth;
    }
    
    /* Highlight Styles - Optimized for mobile rendering */
    :global(.tts-highlight) {
        background-color: #fde047; /* yellow-300 */
        color: #000 !important; 
        border-radius: 2px;
        transition: background-color 0.1s;
        text-shadow: none !important; 
        box-shadow: 0 0 0 2px #fde047;
        display: inline-block; /* Ensures box-shadow works correctly on wrapped text */
    }
    
    :global(.dark .tts-highlight) {
        background-color: #854d0e; /* yellow-800 */
        color: #fff !important;
        box-shadow: 0 0 0 2px #854d0e;
    }

    /* Blur Mode Styles - Desktop Only */
    @media (min-width: 768px) {
        :global(.tts-blur-mode) {
            color: transparent !important;
            text-shadow: 0 0 6px rgba(0,0,0,0.4);
            user-select: none; /* Prevent selection while reading */
        }

        :global(.dark .tts-blur-mode) {
            text-shadow: 0 0 6px rgba(255,255,255,0.4);
        }
    }
    
    /* Ensure other elements like images inside aren't totally ruined, 
       though text-shadow only affects text. */
</style>