export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string; // Full HTML or Markdown content
  tags: string[];
  author?: string;
  readTime?: string;
  category: 'system' | 'blog';
}

export type ViewState = 'home' | 'about' | 'portfolio' | 'blog' | 'contact' | 'resume';