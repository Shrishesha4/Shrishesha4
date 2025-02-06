<script lang="ts">
    import SocialLinks from '$lib/components/socialLinks.svelte';
    import { onMount } from 'svelte';
    import { blogs } from '$lib/stores/blogs';
    import { projects } from '$lib/stores/projects';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import type { SvelteComponentTyped } from 'svelte';

    let loading = true;
    let error = '';
    let githubError = false;


    let Hero: typeof SvelteComponentTyped<any> | null = null;
    let NewBlogPosts: typeof SvelteComponentTyped<any> | null = null;
    let FeaturedProjects: typeof SvelteComponentTyped<any> | null = null;
    let GithubRepos: typeof SvelteComponentTyped<any> | null = null;

    $: blogPosts = $blogs || [];
    $: projectsList = $projects || [];

    async function loadComponents() {
        const [heroMod, blogsMod, projectsMod, reposMod] = await Promise.all([
            import('$lib/components/hero.svelte'),
            import('$lib/components/newBlogPosts.svelte'),
            import('$lib/components/featuredProjects.svelte'),
            import('$lib/components/GithubRepos.svelte')
        ]);

        Hero = heroMod.default as typeof SvelteComponentTyped<any>;
        NewBlogPosts = blogsMod.default as typeof SvelteComponentTyped<any>;
        FeaturedProjects = projectsMod.default as typeof SvelteComponentTyped<any>;
        GithubRepos = reposMod.default as typeof SvelteComponentTyped<any>;
    }

    function handleGithubError() {
        githubError = true;
    }

    async function fetchData() {
        try {
            loading = true;
            await Promise.all([
                blogs.load(),
                projects.load(),
                loadComponents()
            ]);
        } catch (err: any) {
            console.error('Error details:', err);
            error = `Error: ${err.message}`;
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchData();

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
        script.setAttribute('data-name', 'bmc-button');
        script.setAttribute('data-slug', 'shrishesha4');
        script.setAttribute('data-color', '#FF5F5F');
        script.setAttribute('data-emoji', '');
        script.setAttribute('data-font', 'Lato');
        script.setAttribute('data-text', 'Buy me a coffee');
        script.setAttribute('data-outline-color', '#000000');
        script.setAttribute('data-font-color', '#ffffff');
        script.setAttribute('data-coffee-color', '#FFDD00');
        
        document.head.appendChild(script);
    });
</script>

<div class="min-h-screen p-4 pt-0">
    <div class="group fixed top-4 right-4 z-50 mr-12 mt-5 hidden md:block">
        <a 
            href="https://www.buymeacoffee.com/shrishesha4" 
            target="_blank"
            class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
        >
            <i class="fas fa-coffee text-2xl text-[#FFA500]"></i>
            <span class="sr-only">Buy me a coffee</span>
        </a>
        <div class="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 bg-white dark:bg-neutral-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <p class="text-sm text-neutral-800 dark:text-neutral-200">Buy me a coffee ☕</p>
            <div class="absolute right-0 top-1/2 translate-x-1 -translate-y-1/2 w-2 h-2 bg-white dark:bg-neutral-800 rotate-45"></div>
        </div>
    </div>
    <SocialLinks/>
    <hr class="bg-gray m-5 dark:bg-neutral-800 md:hidden" />
    <div class="mx-auto max-w-4xl">
        <section class="mb-16">
            {#if Hero}
                <svelte:component this={Hero} />
            {/if}
        </section>

        {#if error}
            <div class="mb-8 rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400">
                {error}
                <button class="ml-4 text-sm underline" on:click={() => { error = ''; fetchData(); }}>
                    Try again
                </button>
            </div>
        {:else if loading}
            <div class="flex items-center justify-center py-8">
                <LoadingSpinner/>
            </div>
        {:else}
            <section class="mb-16">
                {#if NewBlogPosts}
                    <svelte:component this={NewBlogPosts} 
                        posts={blogPosts} 
                        {error} 
                        onRetry={() => { error = ''; fetchData(); }} 
                    />
                {/if}
            </section>
            <section class="mb-16">
                {#if FeaturedProjects}
                    <svelte:component this={FeaturedProjects}
                        projects={projectsList} 
                        {error} 
                        onRetry={() => { error = ''; fetchData(); }} 
                    />
                {/if}
            </section>
            <section>
                {#if !githubError && GithubRepos}
                    <svelte:component this={GithubRepos} on:error={handleGithubError} />
                {/if}
            </section>
        {/if}
    </div>
</div>
