"use client";

import { BentoGrid, BentoCard } from "components/magicui/bento-grid";
import Eyebrow from "./Eyebrow";
import type { PostMeta } from "~/types";

import React from "react";
import Bento from "./ui/Bento";

type LatestPostsProps = {
  posts: PostMeta[];
  limit?: number;
};

const LatestPosts = ({ posts, limit = 4 }: LatestPostsProps) => {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
      <Eyebrow
        title="Latest Posts"
        description="Idkk"
        eyebrowText="See my recent posts"
        className="mt-15 mb-10"
      />

      <BentoGrid className="lg:grid-rows-3">
        <Bento latestPosts={posts} />
      </BentoGrid>
    </div>
  );
};

export default LatestPosts;
