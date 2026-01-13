<script lang="ts">
	import { onMount } from 'svelte';
	import { githubService } from '$lib/services/github';
	import { profile } from '$lib/stores/profile';
	import LoadingSpinner from './LoadingSpinner.svelte';

	interface Props {
		onerror?: () => void;
	}

	let { onerror }: Props = $props();

	let repos: any[] = $state([]);
	let featuredRepos: any[] = $state([]);
	let error: string = $state('');
	let loading = $state(true);
	let isMobile = $state(false);
	let visibleCards: Set<number> = $state(new Set());
	let observer: IntersectionObserver | null = $state(null);
	let activeCard: number | null = $state(null);
	let isMounted = true; // Flag to prevent state updates after unmount

	onMount(() => {
		isMounted = true;
		checkMobile();
		window.addEventListener('resize', checkMobile);

		// Load profile first to get featured repos list and wait for data
		(async () => {
			let profileUnsubscribe: (() => void) | null = null;
			
			try {
				await profile.load();
				// Wait for profile data to be available in the store
				await new Promise<void>((resolve) => {
					profileUnsubscribe = profile.subscribe((p) => {
						if (p && (p.featuredRepos || p.name)) {
							if (profileUnsubscribe) profileUnsubscribe();
							profileUnsubscribe = null;
							resolve();
						}
					});
					// Timeout after 2 seconds to prevent hanging
					setTimeout(() => {
						if (profileUnsubscribe) {
							profileUnsubscribe();
							profileUnsubscribe = null;
						}
						resolve();
					}, 2000);
				});
			} catch (err) {
				console.error('Error loading profile:', err);
			}

			// Only load repositories if component is still mounted
			if (isMounted) {
				loadRepositories();
			}
		})();

		return () => {
			isMounted = false;
			if (observer) {
				observer.disconnect();
			}
			window.removeEventListener('resize', checkMobile);
		};
	});

	function setupScrollObserver() {
		if (!isMobile && featuredRepos.length > 0) {
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const index = parseInt(entry.target.getAttribute('data-index') || '0');
							visibleCards = new Set([...visibleCards, index]);
						}
					});
				},
				{ threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
			);

			setTimeout(() => {
				const cards = document.querySelectorAll('.featured-repo-card');
				cards.forEach((card) => observer?.observe(card));
			}, 200);
		}
	}

	$effect(() => {
		if (featuredRepos.length > 0 && isMobile) {
			const allIndices = Array.from({ length: Math.min(featuredRepos.length, 4) }, (_, i) => i);
			visibleCards = new Set(allIndices);
		}
	});

	async function loadRepositories() {
		if (!isMounted) return; // Don't update state if component unmounted
		
		try {
			repos = await githubService.getRepositories();
			
			if (!isMounted) return; // Check again after async operation
			
			repos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

			// Filter by featured repos from profile, or fallback to all repos sorted by stars
			const featuredRepoNames = $profile.featuredRepos || [];
			if (featuredRepoNames.length > 0) {
				featuredRepos = repos.filter((repo) => featuredRepoNames.includes(repo.name));
			} else {
				featuredRepos = repos;
			}

			loading = false;
			if (isMounted) {
				setTimeout(() => setupScrollObserver(), 200);
			}
		} catch (err) {
			console.error('Error fetching repositories:', err);
			if (isMounted) {
				error = 'Failed to load repositories';
				loading = false;
				onerror?.();
			}
		}
	}

	function checkMobile() {
		isMobile = window.innerWidth < 768;
	}

	function toggleModal(index: number) {
		activeCard = activeCard === index ? null : index;
	}
</script>

{#if !error}
	<div>
		<h2 class="mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
			Featured Repositories
		</h2>
		{#if loading}
			<div class="flex justify-center">
				<LoadingSpinner />
			</div>
		{:else if featuredRepos.length > 0}
			<div class="space-y-8">
				{#each featuredRepos as repo, index}
					<div
						data-index={index}
						onclick={() => toggleModal(index)}
						onkeydown={(e) => e.key === 'Enter' && toggleModal(index)}
						role="button"
						tabindex="0"
						class="featured-repo-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-black/20 md:flex-row {index %
							2 ===
						1
							? 'md:flex-row-reverse'
							: ''} cursor-pointer"
						class:opacity-0={!isMobile && !visibleCards.has(index)}
						class:animate-slide-in-left={!isMobile && visibleCards.has(index) && index % 2 === 0}
						class:animate-slide-in-right={!isMobile && visibleCards.has(index) && index % 2 === 1}
					>
						<div
							class="from-primary-500/20 to-primary-700/30 relative flex h-64 w-full items-center justify-center overflow-hidden bg-gradient-to-br md:h-96 md:w-1/2"
						>
							<i
								class="fab fa-github text-9xl text-white/30 transition-all duration-500 group-hover:scale-110 group-hover:text-white/50"
							></i>
							<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
						</div>

						<div class="relative flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
							<h3
								class="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-4 text-3xl font-bold text-neutral-900 transition-colors duration-300 dark:text-white md:text-4xl"
							>
								{repo.name}
							</h3>
							<p class="mb-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
								{repo.description || 'No description available'}
							</p>

							<div class="mb-8 flex flex-wrap gap-6 text-base">
								{#if repo.language}
									<span class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
										<span class="bg-primary-500 h-4 w-4 rounded-full"></span>
										{repo.language}
									</span>
								{/if}
								<span class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
									⭐ {repo.stargazers_count}
								</span>
								<span class="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
									🍴 {repo.forks_count}
								</span>
							</div>
						</div>

						<div
							class="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-500 {activeCard ===
							index
								? 'pointer-events-auto opacity-100'
								: 'pointer-events-none opacity-0'}"
						>
							<a
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
								onclick={(e) => e.stopPropagation()}
								class="flex min-w-[200px] transform items-center justify-center gap-3 rounded-xl bg-neutral-800 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 {activeCard ===
								index
									? 'scale-100'
									: 'scale-75'}"
							>
								<i class="fab fa-github text-xl"></i>
								<span>View Repository</span>
							</a>
						</div>

						<div
							class="bg-primary-500/10 group-hover:bg-primary-500/20 absolute right-0 top-0 -z-10 h-32 w-32 rounded-full blur-3xl transition-all duration-500"
						></div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-neutral-600 dark:text-neutral-400">
				No repositories available yet.
			</p>
		{/if}
	</div>
{/if}

<style>
	@keyframes slideInLeft {
		from {
			opacity: 0;
			transform: translateX(-100px) translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0) translateY(0);
		}
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(100px) translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0) translateY(0);
		}
	}

	.animate-slide-in-left {
		animation: slideInLeft 0.8s ease-out forwards;
	}

	.animate-slide-in-right {
		animation: slideInRight 0.8s ease-out forwards;
	}
</style>
