export const categoryKeywords = {
  "Web Development": ["web", "website", "frontend", "backend", "fullstack", "html", "css", "javascript", "react", "vue", "angular", "svelte", "next", "nuxt", "node", "express", "django", "flask", "api", "rest", "graphql"],
  "Mobile Apps": ["mobile", "app", "ios", "android", "flutter", "react native", "swift", "kotlin", "xamarin"],
  "AI & Machine Learning": ["ai", "ml", "machine learning", "artificial intelligence", "neural", "deep learning", "tensorflow", "pytorch", "model", "nlp", "computer vision", "prediction"],
  "Data Science": ["data", "analytics", "visualization", "dashboard", "analysis", "pandas", "numpy", "jupyter", "statistics", "insights"],
  "Blockchain & Web3": ["blockchain", "crypto", "web3", "ethereum", "solidity", "nft", "defi", "smart contract", "dapp"],
  "Game Development": ["game", "gaming", "unity", "unreal", "godot", "phaser", "gameplay"],
  "DevOps & Cloud": ["devops", "cloud", "aws", "azure", "gcp", "docker", "kubernetes", "ci/cd", "deployment", "infrastructure"],
  "Tools & Utilities": ["tool", "utility", "cli", "automation", "script", "bot", "extension", "plugin"],
  "E-commerce": ["shop", "store", "ecommerce", "e-commerce", "cart", "payment", "checkout", "marketplace"],
  "Social & Networking": ["social", "chat", "messaging", "community", "forum", "network", "communication"],
  "Portfolio & Personal": ["portfolio", "personal", "blog", "resume", "cv", "profile"],
  Other: [],
} as const;

export type Category = keyof typeof categoryKeywords;

export function categorizeProject(title: string, description: string, technologies: string[] = []): string[] {
  const text = `${title} ${description} ${technologies.join(" ")}`.toLowerCase();
  const categories: string[] = [];

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (category === "Other") continue;
    const matches = (keywords as readonly string[]).some((keyword) => text.includes(keyword.toLowerCase()));
    if (matches) categories.push(category);
  }

  return categories.length > 0 ? categories : ["Other"];
}
