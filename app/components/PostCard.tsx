import type { BentoPosts, PostMeta } from "~/types";
import { Link } from "react-router";

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { MagicCard } from "components/magicui/magic-card";
import { Button } from "./ui/button";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import { RainbowButton } from "components/magicui/rainbow-button";
import clsx from "clsx";

const PostCard = ({ post }: { post: BentoPosts }) => {
  const TAG_GRADIENTS: Record<
    string,
    { from: string; to: string; color: string }
  > = {
    Now: { from: "#fff1d6", to: "#ffffff", color: "#ffb112" },
    Notes: { from: "#e8f9df", to: "#ffffff", color: "#71dd37" },
    Snippets: { from: "#d6f5fc", to: "#ffffff", color: "#1ecaee" },
    Research: { from: "#e7e7ff", to: "#ffffff", color: "#696cff" },
  };

  return (
    <div
      className={`${post.colSpan} sm:h-[27rem] h-max w-[32rem] sm:w-[22rem]`}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <MagicCard
          className="rounded-lg shadow-md"
          gradientFrom={TAG_GRADIENTS[post.tags]?.from ?? "#ffffff"}
          gradientTo={TAG_GRADIENTS[post.tags]?.to ?? "#ffffff"}
          gradientColor={TAG_GRADIENTS[post.tags]?.color ?? "#000000"}
        >
          <img
            src={post.image}
            className="w-full h-48 object-cover rounded mb-4 transition-transform duration-300 group-hover:scale-105 ease-out "
          />
          <div className="px-6 pb-6 flex-col gap-2">
            <span className="text-sm text-gray-400 my-2">
              {new Date(post.date).toDateString()}
            </span>
            <h3 className="text-xl font-semibold text-gray-500 max-w-[25ch] group-hover:underline">
              {post.title}
            </h3>{" "}
            <p className="text-gray-400 mb-4">{post.excerpt}</p>
            <RainbowButton variant="outline">Read More →</RainbowButton>
          </div>
        </MagicCard>
      </Link>
    </div>
  );
};

export default PostCard;
