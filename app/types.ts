//This defines the structure of the project data and enables type checking

export type Projects = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image: string;
  url?: string;
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
};

// Strapi response  w generic type, an array that can be anything
export type StrapiResponse<T> = {
  data: T[];
};

// type for project attributes from STRAPI , including document id
export type StrapiProject = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image?: {
    url: string;
    formats?: {
      thumnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  url?: string;
  date: Date;
  category: string;
  featured: boolean;
};

export type StrapiPost = {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  body: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
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
