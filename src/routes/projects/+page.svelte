<script lang="ts">
    import BuyMeCoffee from '$lib/components/BuyMeCoffee.svelte';
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

<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-4xl font-bold">Projects</h1>
            <BuyMeCoffee mode="button" />
        </div>
        <ProjectViewer/>
		{#if !githubError}
			<GithubRepos on:error={handleGithubError} />
		{/if}
    </div>
</div>