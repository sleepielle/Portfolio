// This defines the structure of the project data and enables type checking

import type { IconProps } from "@radix-ui/react-icons/dist/types";

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
  tags: string;
  className?: string;
  pdfRoute?: string;
  devNotesLinks?: string[];
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

export type IconType = React.ElementType<IconProps>;
export type SVGProps = React.HTMLAttributes<SVGElement>;

export type BentoPosts = PostMeta & {
  icon?: IconType;
  colSpan?: string;
  rowSpan?: string;
};

//Any object whose keys are strings and values are numbers
export type TagCounts = Record<string, number>;
