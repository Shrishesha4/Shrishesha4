import "server-only";
import type { GithubRepo } from "@/lib/types";

const GITHUB_USER = "shrishesha4";

export async function getGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
      next: { revalidate: 1800 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return [];
    const repos = (await res.json()) as GithubRepo[];
    return repos.filter((r) => !r.fork);
  } catch (error) {
    console.error("Error loading GitHub repos:", error);
    return [];
  }
}
