<script lang="ts">
	import TypingAnimation from '$lib/components/typinganimation.svelte';
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase/config';
	import { doc, getDoc } from 'firebase/firestore';
	import GithubRepos from '$lib/components/GithubRepos.svelte';

	let projects: any[] = [];
	let blogPosts: any[] = [];
	let loading = true;
	let error = '';
	let githubError = false;

	function handleGithubError() {
		githubError = true;
	}

	async function fetchData() {
		try {
			loading = true;
			console.log('Starting data fetch...');

			// Fetch projects using the document ID
			const projectsRef = doc(db, 'projects', 'Ykr9irYsL8YYEFgspxCuQ7Rkv5E2');
			const projectsDoc = await getDoc(projectsRef);

			if (projectsDoc.exists()) {
				const data = projectsDoc.data();
				projects = data.projects || [];
				console.log('Projects loaded.');
			}

			const blogsRef = doc(db, 'blogs', 'Ykr9irYsL8YYEFgspxCuQ7Rkv5E2');
			const blogsDoc = await getDoc(blogsRef);

			if (blogsDoc.exists()) {
				const data = blogsDoc.data();
				blogPosts = data.blogs || [];
				console.log('Blog posts loaded');
			} else {
				console.log('No Blog posts.');
			}
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

<!-- svelte-ignore element_invalid_self_closing_tag -->
<!-- Remove the social links from the top -->
<div class="min-h-screen p-4 pt-0">
	<!-- Add a fixed position container for desktop -->
	<div class="fixed bottom-8 left-8 hidden flex-col gap-8 md:flex">
		<a
			href="https://github.com/shrishesha4"
			target="_blank"
			rel="noopener noreferrer"
			class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
		>
			<i class="fa-brands fa-github text-2xl"></i>
			<span class="sr-only">GitHub</span>
		</a>
		<a
			href="https://linkedin.com/in/shrishesha"
			target="_blank"
			rel="noopener noreferrer"
			class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
		>
			<i class="fa-brands fa-linkedin text-2xl"></i>
			<span class="sr-only">LinkedIn</span>
		</a>
		<a
			href="https://x.com/Shrishesha4"
			target="_blank"
			rel="noopener noreferrer"
			class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
		>
			<i class="fa-brands fa-x-twitter text-2xl"></i>
			<span class="sr-only">Twitter</span>
		</a>
		<a
			href="mailto:shrisheshanarmatesshvara@gmail.com"
			target="_blank"
			class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
		>
			<i class="fa-regular fa-envelope text-2xl"></i>
			<span class="sr-only">Email</span>
		</a>
	</div>

	<!-- Add mobile view social links -->
	<div class="mb-3 flex justify-center gap-8 md:hidden">
		<!-- Same social links as above -->
		<a
			href="https://github.com/shrishesha4"
			target="_blank"
			rel="noopener noreferrer"
			class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
		>
			<i class="fa-brands fa-github text-2xl"></i>
			<span class="sr-only">GitHub</span>
		</a>
		<a
			href="https://linkedin.com/in/shrishesha"
			target="_blank"
			rel="noopener noreferrer"
			class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
		>
			<i class="fa-brands fa-linkedin text-2xl"></i>
			<span class="sr-only">LinkedIn</span>
		</a>
		<a
			href="https://x.com/Shrishesha4"
			target="_blank"
			rel="noopener noreferrer"
			class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
		>
			<i class="fa-brands fa-x-twitter text-2xl"></i>
			<span class="sr-only">Twitter</span>
		</a>
		<a
			href="mailto:shrisheshanarmatesshvara@gmail.com"
			target="_blank"
			class="text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
		>
			<i class="fa-regular fa-envelope text-2xl"></i>
			<span class="sr-only">Email</span>
		</a>
	</div>
	<hr class="bg-gray m-5 dark:bg-gray-800 md:hidden" />
	<div class="mx-auto max-w-4xl">
		<!-- Hero Section -->
		<section class="mb-16">
			<h1 class="mb-6 text-6xl font-bold text-neutral-900 dark:text-neutral-100">
				Hi, I'm Shrishesha
			</h1>
			<div class="mb-8 text-5xl text-neutral-700 dark:text-neutral-300">
				I'm <span class="font-comic text-red-600 dark:text-red-400"><TypingAnimation /></span>
			</div>
			<p class="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
				I craft intuitive user experiences and build innovative solutions.
			</p>
			<div class="flex gap-4">
				<a
					href="/aboutme"
					class="inline-flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-white transition hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
				>
					Know Me
				</a>
				<a
					href="/contact"
					class="inline-flex items-center rounded-lg border border-neutral-300 px-6 py-3 text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
				>
					Contact Me
				</a>
			</div>
		</section>

		{#if error}
			<div
				class="mb-8 rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400"
			>
				{error}
				<button
					class="ml-4 text-sm underline"
					on:click={() => {
						error = '';
						fetchData();
					}}
				>
					Try again
				</button>
			</div>
		{:else if loading}
			<div class="flex items-center justify-center py-8">
				<div
					class="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-neutral-900 dark:border-neutral-100"
				/>
			</div>
		{:else}
			<!-- Featured Projects -->
			<section class="mb-16">
				<h2 class="mb-8 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
					Featured Projects
				</h2>
				{#if projects.length > 0}
					<div class="grid gap-6 md:grid-cols-2">
						{#each projects.slice(0, 4) as project}
							<div
								class="rounded-xl bg-neutral-200 p-6 shadow-sm transition hover:shadow-md dark:bg-neutral-800"
							>
								{#if project.image}
									<img
										src={project.image}
										alt={project.title}
										class="mb-4 h-48 w-full rounded-lg object-cover"
									/>
								{/if}
								<h3 class="mb-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
									{project.title}
								</h3>
								<p class="mb-4 line-clamp-2 text-neutral-600 dark:text-neutral-300">
									{project.description}
								</p>
								<div class="flex flex-col gap-4">
									{#if project.technologies && project.technologies.length > 0}
										<div class="flex flex-wrap gap-2">
											{#each project.technologies as tech}
												<span
													class="rounded-full bg-neutral-300 px-2 py-1 text-xs dark:bg-neutral-700"
												>
													{tech}
												</span>
											{/each}
										</div>
									{/if}
									<div class="flex gap-2">
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											class="block rounded-md bg-neutral-800 px-4 py-2 text-center text-sm text-white transition-colors duration-200 hover:bg-neutral-700 dark:bg-neutral-600 dark:hover:bg-neutral-500"
										>
											GitHub
										</a>
										{#if project.url}
											<a
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												class="block rounded-md border border-neutral-800 px-4 py-2 text-center text-sm text-neutral-800 transition-colors duration-200 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-700"
											>
												Visit
											</a>
										{/if}
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-center text-neutral-600 dark:text-neutral-400">
						No projects available yet.
					</p>
				{/if}
			</section>

			<section>
				{#if !githubError}
					<GithubRepos on:error={handleGithubError} />
				{/if}
			</section>

			<!-- Latest Blog Posts -->
			<section class="mb-16">
				<h2 class="mb-8 text-2xl font-bold text-neutral-900 dark:text-neutral-100">Latest Posts</h2>
				{#if blogPosts.length > 0}
					<div class="space-y-6">
						{#each blogPosts.slice(0, 4) as post}
							<a
								href={`/blogs/${post.slug}`}
								class="block rounded-xl bg-white p-6 transition hover:shadow-md dark:bg-neutral-800"
							>
								<div class="flex items-start justify-between">
									<div>
										<h3 class="mb-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
											{post.title}
										</h3>
										<p class="mb-2 text-xs font-light text-neutral-900 dark:text-neutral-100">
											{post.description}
										</p>
										<p
											class="line-clamp-2 text-xs font-thin text-neutral-600 dark:text-neutral-300"
										>
											{#each post.tags as t}
												{t} <br />
											{/each}
										</p>
									</div>
									<span class="text-xs text-neutral-500 dark:text-neutral-400">
										{new Date(post.date).toLocaleDateString('en-US', {
											month: 'short',
											year: 'numeric'
										})}
									</span>
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<p class="text-center text-neutral-600 dark:text-neutral-400">
						No blog posts available yet.
					</p>
				{/if}
			</section>
		{/if}
	</div>
</div>
