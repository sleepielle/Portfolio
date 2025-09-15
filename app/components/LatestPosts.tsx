"use client";

import Eyebrow from "./Eyebrow";
import type { PostMeta, BentoPosts, IconType } from "~/types";
import PostCard from "./PostCard";

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { RainbowButton } from "components/magicui/rainbow-button";
import { Link } from "react-router";

const ICONS: IconType[] = [
  FileTextIcon,
  CalendarIcon,
  GlobeIcon,
  InputIcon,
  BellIcon,
];

const COL_SPAN = [
  "md:col-span-3 ",
  "md:col-span-1 ",
  "md:col-span-1 ",
] as const;

const ROW_SPAN = ["", "", "", ""] as const;

const LatestPosts = ({ posts }: { posts: PostMeta[] }) => {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const postsWithUI: BentoPosts[] = latestPosts.map((post, i) => ({
    ...post,
    icon: ICONS[i % ICONS.length],
    colSpan: COL_SPAN[i % COL_SPAN.length],
    rowSpan: ROW_SPAN[i % COL_SPAN.length],
  }));

  return (
    <div className="">
      <Eyebrow
        title="Latest Posts"
        description="From debugging to design systems, here are my latest posts showing tutorials, notes and reflections as a software engineer."
        eyebrowText="See all posts"
        className="mt-15 mb-10"
        route="blog"
      />

      <div className="grid [grid-template-columns:repeat(3),minmax(0,1fr))] grid-flow-dense gap-4 ">
        {postsWithUI.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
