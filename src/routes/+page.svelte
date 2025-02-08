<script lang="ts">
    import BuyMeCoffee from '$lib/components/BuyMeCoffee.svelte';
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
    });
</script>

<div class="min-h-screen p-4 pt-0">
    <div class="fixed top-4 right-4 z-50 mr-12 mt-5 hidden md:block">
        <BuyMeCoffee mode="button" />
    </div>
    <SocialLinks/>
    <hr class="border-t border-neutral-600 dark:border-neutral-400 m-5 md:hidden" />
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
