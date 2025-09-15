"use client";

import Eyebrow from "./Eyebrow";
import type { PostMeta, BentoPosts } from "~/types";
import PostCard from "./PostCard";

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

const ICONS = [
  FileTextIcon,
  CalendarIcon,
  GlobeIcon,
  InputIcon,
  BellIcon,
] as const;

const GRID_CLASSES = [
  "col-span-3 md:col-span-6  md:row-span-4",
  "col-span-3 md:col-span-2",
  "col-span-3 md:col-span-2",
  "col-span-3 md:col-span-1",
] as const;

const LatestPosts = ({ posts }: { posts: PostMeta[] }) => {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const postsWithUI: BentoPosts[] = latestPosts.map((post, i) => ({
    ...post,
    gridClass: GRID_CLASSES[i % GRID_CLASSES.length],
    icon: ICONS[i % ICONS.length],
  }));

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
      <Eyebrow
        title="Latest Posts"
        description="Idkk"
        eyebrowText="See my recent posts"
        className="mt-15 mb-10"
      />
      <div className="grid [grid-template-columns:repeat(4),minmax(0,1fr))] grid-flow-dense gap-4">
        {postsWithUI.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
