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
<div class="min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-4xl font-bold">Projects</h1>
            <div class="shadow-xl rounded-full">
                <a 
                    href="https://www.buymeacoffee.com/shrishesha4" 
                    target="_blank"
                    class="inline-flex items-center px-3 py-3 bg-[#FFA500] hover:bg-neutral-900 text-white rounded-full transition-colors duration-200"
                >
                    <i class="fas fa-coffee text-m text-black"></i>
                    <!-- <span class="text-m text-black">Buy Me A Coffee</span> -->
                </a>
            </div>
        </div>
        <ProjectViewer/>
		{#if !githubError}
			<GithubRepos on:error={handleGithubError} />
		{/if}
    </div>
</div>