export interface Blog {
  id: string;
  title: string;
  content: string;
  description: string;
  image?: string;
  date: string;
  tags: string[];
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  url?: string;
  github?: string;
  featured?: boolean;
  resumeSummary?: string[];
}

export interface Education {
  year: string;
  degree: string;
  institution: string;
}

export interface Badge {
  title: string;
  imageUrl: string;
}

export interface Profile {
  name: string;
  title: string;
  sub_title: string[];
  bio: string;
  resumeBio?: string;
  resumeDataHash?: string;
  location: string;
  skills: string[];
  experience: string[];
  education: Education[];
  typingStrings: string[];
  favicon: string;
  profileImage: string;
  techStack: string[];
  particlesQuantity: number;
  badges: Badge[];
  featuredRepos?: string[];
}

export const defaultProfile: Profile = {
  name: "",
  title: "",
  sub_title: [""],
  bio: "",
  resumeBio: "",
  resumeDataHash: "",
  location: "",
  skills: [],
  experience: [],
  education: [],
  typingStrings: [""],
  favicon: "",
  profileImage: "",
  techStack: [],
  particlesQuantity: 1000,
  badges: [],
  featuredRepos: [],
};

export interface ContactConfig {
  spreadsheetUrl: string;
  email: string;
  phone?: string;
  location?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  order: number;
  enabled: boolean;
}

export interface SocialLinksConfig {
  links: SocialLink[];
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  homepage: string | null;
  updated_at: string;
}
