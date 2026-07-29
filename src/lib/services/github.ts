import { cacheService } from './cache';

interface GithubRepo {
	id: number;
	name: string;
	description: string;
	html_url: string;
	language: string;
	stargazers_count: number;
	forks_count: number;
}

const CACHE_KEY = 'github_repos';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const REPOS_URL = 'https://api.github.com/users/shrishesha4/repos';

export const githubService = {
	async getRepositories(): Promise<GithubRepo[]> {
		const cached = cacheService.get<GithubRepo[]>(CACHE_KEY);
		if (cached) return cached;

		const response = await fetch(REPOS_URL, {
			headers: { Accept: 'application/vnd.github+json' }
		});
		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const repos = (await response.json()) as GithubRepo[];
		cacheService.set(CACHE_KEY, repos, CACHE_TTL);
		return repos;
	}
};
