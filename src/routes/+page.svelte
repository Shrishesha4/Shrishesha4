<script lang="ts">
    import Hero from '$lib/components/hero.svelte';
    import NewBlogPosts from '$lib/components/newBlogPosts.svelte';
    import FeaturedProjects from '$lib/components/featuredProjects.svelte';
    import SocialLinks from '$lib/components/socialLinks.svelte';
    import { onMount } from 'svelte';
    import { blogs } from '$lib/stores/blogs';
    import { projects } from '$lib/stores/projects';
    import GithubRepos from '$lib/components/GithubRepos.svelte';
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    let loading = true;
    let error = '';
    let githubError = false;
    
    // Initialize with empty arrays to prevent undefined errors
    $: blogPosts = $blogs || [];
    $: projectsList = $projects || [];

    function handleGithubError() {
        githubError = true;
    }

    async function fetchData() {
        try {
            loading = true;
            await Promise.all([
                blogs.load(),
                projects.load()
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
    <SocialLinks/>
    <hr class="bg-gray m-5 dark:bg-gray-800 md:hidden" />
    <div class="mx-auto max-w-4xl">
        <section class="mb-16">
            <Hero/>
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
                <NewBlogPosts 
                    posts={blogPosts} 
                    {error} 
                    onRetry={() => { error = ''; fetchData(); }} 
                />
            </section>
            <section class="mb-16">
                <FeaturedProjects 
                    projects={projectsList} 
                    {error} 
                    onRetry={() => { error = ''; fetchData(); }} 
                />
            </section>
            <section>
                {#if !githubError}
                    <GithubRepos on:error={handleGithubError} />
                {/if}
            </section>
        {/if}
    </div>
</div>
