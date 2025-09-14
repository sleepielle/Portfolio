// This defines the structure of the project data and enables type checking

export type Projects = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image: string;
  liveSite: string;
  github: string;
  date: Date;
  category: string;
  featured: boolean;
};

export type PostMeta = {
  id: string;
  slug: string;
  excerpt: string;
  title: string;
  date: string;
  body: string;
  image: string;
  className?: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  body: string;
  excerpt: string;
  date: string;
  image: string;
};
