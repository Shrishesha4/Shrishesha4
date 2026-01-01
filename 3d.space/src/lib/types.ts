export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  link?: string;
  demo?: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  techStack: string[];
  experience: any[];
  education: any[];
  typingStrings: string[];
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  slug: string;
  content?: string;
}