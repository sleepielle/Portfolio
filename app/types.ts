// This defines the structure of the project data and enables type checking

import type { IconProps } from "@radix-ui/react-icons/dist/types";

type ProjectResult = {
  title: string;
};

export type Projects = {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  featuredImage: string;
  liveSite: string;
  github: string;
  date: Date;
  category: string;
  featured: boolean;
  results?: ProjectResult[];
  inProgress: boolean;
};

export type PostMeta = {
  id: string;
  slug: string;
  shortExcerpt: string;
  longExcerpt: string;
  title: string;
  date: string;
  body: string;
  image: string;
  tags: string;
  className?: string;
  pdfRoute?: string;
  devNotesLinks?: string[];
  availableToPublish: boolean;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  body: string;
  shortExcerpt: string;
  longExcerpt: string;
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

export type ProjectCardProps = {
  project: Projects;
  className?: string;
};

export type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
};

export type ProjectDetailsPageProps = {
  loaderData: {
    project: Projects;
    markdown: string;
  };
};
