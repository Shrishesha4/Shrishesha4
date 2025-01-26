<script lang="ts">
    import { projects } from '$lib/stores/projects';
    import { onMount } from 'svelte';
    import ProjectViewer from '$lib/components/projectviewer.svelte';
    import GithubRepos from '$lib/components/GithubRepos.svelte';

    let githubError = false;

    onMount(async () => {
        await projects.load();
    });

    function handleGithubError() {
        githubError = true;
    }
</script>

<div class="min-h-screen p-4 pt-0">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-neutral-100">Projects</h1>
        <ProjectViewer />
        {#if !githubError}
            <GithubRepos on:error={handleGithubError} />
        {/if}
    </div>
</div>