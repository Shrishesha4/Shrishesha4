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
    github?: string;
    url?: string;
}