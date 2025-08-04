//This defines the structure of the project data and enables type checking

export type Projects = {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  date: Date;
  category: string;
  featured: boolean;
};
