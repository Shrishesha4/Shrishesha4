<script lang="ts">
	import TypingAnimation from '$lib/components/typinganimation.svelte';
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase/config';
	import { doc, getDoc } from 'firebase/firestore';

	let projects: any[] = [];
	let blogPosts: any[] = [];
	let loading = true;
	let error = '';

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
				console.log('Projects loaded:', projects);
			}


			const blogsRef = doc(db, 'blogs', 'Ykr9irYsL8YYEFgspxCuQ7Rkv5E2');
			const blogsDoc = await getDoc(blogsRef);

			if (blogsDoc.exists()) {
				const data = blogsDoc.data();
				blogPosts = data.blogs || [];
				console.log('Blog posts loaded:', blogPosts);
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
    <div class="hidden md:flex fixed left-8 bottom-8 flex-col gap-8">
        <a
            href="https://github.com/shrishesha4"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
            <i class="fa-brands fa-github text-2xl"></i>
            <span class="sr-only">GitHub</span>
        </a>
        <a
            href="https://linkedin.com/in/shrishesha"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
            <i class="fa-brands fa-linkedin text-2xl"></i>
            <span class="sr-only">LinkedIn</span>
        </a>
        <a
            href="https://x.com/Shrishesha4"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
            <i class="fa-brands fa-x-twitter text-2xl"></i>
            <span class="sr-only">Twitter</span>
        </a>
        <a
            href="mailto:shrisheshanarmatesshvara@gmail.com"
            target="_blank"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
            <i class="fa-regular fa-envelope text-2xl"></i>
            <span class="sr-only">Email</span>
        </a>
    </div>

    <!-- Add mobile view social links -->
    <div class="flex md:hidden justify-center gap-8 mb-3">
        <!-- Same social links as above -->
        <a
            href="https://github.com/shrishesha4"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
            <i class="fa-brands fa-github text-2xl"></i>
            <span class="sr-only">GitHub</span>
        </a>
		<a
            href="https://linkedin.com/in/shrishesha"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
            <i class="fa-brands fa-linkedin text-2xl"></i>
            <span class="sr-only">LinkedIn</span>
        </a>
        <a
            href="https://x.com/Shrishesha4"
            target="_blank"
            rel="noopener noreferrer"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
            <i class="fa-brands fa-x-twitter text-2xl"></i>
            <span class="sr-only">Twitter</span>
        </a>
        <a
            href="mailto:shrisheshanarmatesshvara@gmail.com"
            target="_blank"
            class="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
        >
            <i class="fa-regular fa-envelope text-2xl"></i>
            <span class="sr-only">Email</span>
        </a>
    </div>
	<hr class="md:hidden bg-gray dark:bg-gray-800 m-5">
    <div class="mx-auto max-w-4xl">
		<!-- Hero Section -->
		<section class="mb-16">
			<h1 class="mb-6 text-6xl font-bold text-neutral-900 dark:text-neutral-100">
				Hi, I'm Shrishesha
			</h1>
			<div class="text-5xl text-neutral-700 dark:text-neutral-300 mb-8">
				I'm <span class="text-red-600 dark:text-red-400 font-comic"><TypingAnimation /></span>
			</div>
			<p class="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
				I craft intuitive user experiences and build innovative solutions.
			</p>
			<div class="flex gap-4">
				<a
					href="/aboutme"
					class="inline-flex items-center px-6 py-3 bg-neutral-900 dark:bg-neutral-800 text-white rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-700 transition"
				>
					Know Me
				</a>
				<a
					href="/contact"
					class="inline-flex items-center px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
				>
					Contact Me
				</a>
			</div>
		</section>
		
		{#if error}
			<div class="text-red-600 dark:text-red-400 text-center p-4 rounded-lg bg-red-50 dark:bg-red-900/10 mb-8">
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
		
			<div class="flex justify-center items-center py-8">
				<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neutral-900 dark:border-neutral-100" />
			</div>
		{:else}
			<!-- Featured Projects -->
			<section class="mb-16">
				<h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Featured Projects</h2>
				{#if projects.length > 0}
					<div class="grid gap-6 md:grid-cols-2">
						{#each projects.slice(0, 4) as project}
							<div class="bg-neutral-200 dark:bg-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-md transition">
								{#if project.image}
									<img
										src={project.image}
										alt={project.title}
										class="w-full h-48 object-cover rounded-lg mb-4"
									/>
								{/if}
								<h3 class="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
									{project.title}
								</h3>
								<p class="text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2">
									{project.description}
								</p>
								<div class="flex flex-col gap-4">
									{#if project.technologies && project.technologies.length > 0}
										<div class="flex flex-wrap gap-2">
											{#each project.technologies as tech}
												<span class="text-xs px-2 py-1 bg-neutral-300 dark:bg-neutral-700 rounded-full">
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
											class="text-sm block text-center px-4 py-2 bg-neutral-800 dark:bg-neutral-600 text-white rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-500 transition-colors duration-200"
										>
											GitHub
										</a>
										{#if project.url}
											<a
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												class="text-sm block text-center px-4 py-2 border border-neutral-800 dark:border-neutral-600 text-neutral-800 dark:text-neutral-100 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
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
					<p class="text-neutral-600 dark:text-neutral-400 text-center">No projects available yet.</p>
				{/if}
			</section>

			<!-- Latest Blog Posts -->
			<section class="mb-16">
				<h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Latest Posts</h2>
				{#if blogPosts.length > 0}
					<div class="space-y-6">
						{#each blogPosts.slice(0, 4) as post}
							<a
								href={`/blogs/${post.slug}`}
								class="block bg-white dark:bg-neutral-800 rounded-xl p-6 hover:shadow-md transition"
							>
								<div class="flex justify-between items-start">
									<div>
										<h3 class="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
											{post.title}
										</h3>
										<p class="text-neutral-600 dark:text-neutral-300 line-clamp-2">
											{#each post.tag as t}
											{t}
											{/each}
										</p>
									</div>
									<span class="text-xs text-neutral-500 dark:text-neutral-400">
										{new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
									</span>
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<p class="text-neutral-600 dark:text-neutral-400 text-center">No blog posts available yet.</p>
				{/if}
			</section>
		{/if}
	</div>
</div>