import type { BentoPosts, PostMeta } from "~/types";
import { Link } from "react-router";
import { POSTS_CARD_GRADIENTS } from "~/lib/constants";
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
  return (
    <div
      className={`${post.colSpan} sm:h-[27rem] h-max w-[32rem] sm:w-[22rem]`}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <MagicCard
          className={`rounded-lg shadow-xs border-[${POSTS_CARD_GRADIENTS[post.tags]?.from ?? "#ffffff"}]`}
          gradientFrom={POSTS_CARD_GRADIENTS[post.tags]?.from ?? "#ffffff"}
          gradientTo={POSTS_CARD_GRADIENTS[post.tags]?.to ?? "#ffffff"}
          gradientColor={POSTS_CARD_GRADIENTS[post.tags]?.color ?? "#000000"}
          border={POSTS_CARD_GRADIENTS[post.tags]?.color ?? "#ffffff"}
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
