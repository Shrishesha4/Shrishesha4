<script lang="ts">
	import BuyMeCoffee from '$lib/components/BuyMeCoffee.svelte';
	import SocialLinks from '$lib/components/socialLinks.svelte';
	import { onMount } from 'svelte';
	import { blogs } from '$lib/stores/blogs';
	import { projects } from '$lib/stores/projects';
	import { profile } from '$lib/stores/profile';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import type { Component } from 'svelte';

	let loading = $state(true);
	let error = $state('');
	let githubError = $state(false);

	let Hero: Component<Record<string, unknown>, Record<string, unknown>> | null = $state(null);
	let NewBlogPosts: Component<Record<string, unknown>, Record<string, unknown>> | null = $state(null);
	let FeaturedProjects: Component<Record<string, unknown>, Record<string, unknown>> | null = $state(null);
	let GithubRepos: Component<Record<string, unknown>, Record<string, unknown>> | null = $state(null);

	let blogPosts = $derived($blogs || []);
	let projectsList = $derived($projects || []);

	async function loadComponents() {
		const [heroMod, blogsMod, projectsMod, reposMod] = await Promise.all([
			import('$lib/components/hero.svelte'),
			import('$lib/components/newBlogPosts.svelte'),
			import('$lib/components/featuredProjects.svelte'),
			import('$lib/components/featureGithub.svelte')
		]);

		Hero = heroMod.default as unknown as Component<
			Record<string, unknown>,
			Record<string, unknown>
		>;
		NewBlogPosts = blogsMod.default as unknown as Component<
			Record<string, unknown>,
			Record<string, unknown>
		>;
		FeaturedProjects = projectsMod.default as unknown as Component<
			Record<string, unknown>,
			Record<string, unknown>
		>;
		GithubRepos = reposMod.default as unknown as Component<
			Record<string, unknown>,
			Record<string, unknown>
		>;
	}

	function handleGithubError() {
		githubError = true;
	}

	async function fetchData() {
		try {
			loading = true;
			await Promise.all([blogs.load(), projects.load(), profile.load(), loadComponents()]);
		} catch (err: unknown) {
			console.error('Error details:', err);
			if (err instanceof Error) {
				error = `Error: ${err.message}`;
			} else {
				error = `Error: ${String(err)}`;
			}
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchData();
	});
</script>

<div class="min-h-screen p-4 pt-0">
	<div class="fixed right-4 top-4 z-50 mr-12 mt-5 hidden md:block">
		<BuyMeCoffee mode="button" />
	</div>
	<SocialLinks />
	<hr class="m-5 border-t border-neutral-600 dark:border-neutral-400 md:hidden" />
	<div class="mx-auto max-w-7xl">
		{#if error}
			<div
				class="mb-8 rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400"
			>
				{error}
				<button
					class="ml-4 text-sm underline"
					onclick={() => {
						error = '';
						fetchData();
					}}
				>
					Try again
				</button>
			</div>
		{:else if loading}
			<div class="flex items-center justify-center py-8">
				<LoadingSpinner />
			</div>
		{:else}
			<section class="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
				<div>
					{#if Hero}
						<Hero />
					{/if}
				</div>
				<div>
					{#if NewBlogPosts}
						<NewBlogPosts
							posts={blogPosts}
							{error}
							onRetry={() => {
								error = '';
								fetchData();
							}}
						/>
					{/if}
				</div>
			</section>
			<section class="mb-16">
				{#if FeaturedProjects}
					<FeaturedProjects
						projects={projectsList}
						{error}
						onRetry={() => {
							error = '';
							fetchData();
						}}
					/>
				{/if}
			</section>
			<section>
				{#if !githubError && GithubRepos}
					<GithubRepos onerror={handleGithubError} />
				{/if}
			</section>
		{/if}
	</div>
</div>
