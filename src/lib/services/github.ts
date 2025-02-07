import { apiService } from './api';
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

export const githubService = {
    async getRepositories(): Promise<GithubRepo[]> {
        const cached = cacheService.get<GithubRepo[]>(CACHE_KEY);
        if (cached) return cached;

        const repos = await apiService.request<GithubRepo[]>({
            url: 'https://api.github.com/users/shrishesha4/repos',
            method: 'GET'
        });

        cacheService.set(CACHE_KEY, repos, CACHE_TTL);
        return repos;
    }
};