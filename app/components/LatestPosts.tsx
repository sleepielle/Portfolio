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
import { Link } from "react-router";
import FeaturedPosts from "./FeaturedPosts";
import { CATEGORIES } from "~/lib/constants";
import Tag from "./Tag";

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
  "md:col-span-1 ",
] as const;

const ROW_SPAN = ["", "", "", ""] as const;

const LatestPosts = ({ posts }: { posts: PostMeta[] }) => {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const postsWithUI: BentoPosts[] = latestPosts.map((post, i) => ({
    ...post,
    icon: ICONS[i % ICONS.length],
    colSpan: COL_SPAN[i % COL_SPAN.length],
    rowSpan: ROW_SPAN[i % COL_SPAN.length],
  }));

  return (
    <div className="py-20">
      <Eyebrow
        title="Latest Posts"
        description="From debugging to design systems, here are my latest posts showing tutorials, notes and reflections as a software engineer."
        eyebrowText="See all posts"
        className="mt-15 mb-10"
      />

      <div className="flex flex-col ">
        {/* <div className="flex flex-row gap-5 sm:flex-col">
          <h2 className="text-3xl text-gray-600 tracking-tighter">
            Latest Posts
          </h2>
          <p className="text-gray-500">
            From debugging to design systems, here are my latest posts showing
            tutorials, notes and reflections as a software engineer.
          </p>

          <div>
            <ul>
              <li>✦ Snippets</li>
              <li>✦ Now</li>
              <li>✦ Research</li>
              <li>✦ Snippets</li>
            </ul>
          </div>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          {postsWithUI.map((post) => (
            <FeaturedPosts post={post} />
          ))}
        </div>

        <div className="mx-auto mt-5 gap-5">
          {CATEGORIES.map((cat) => (
            <Tag
              key={cat}
              title={cat}
              classname="hover:text-blue-400 hover:border-blue-400 bg-white border-gray-300 mx-3 text-gray-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
