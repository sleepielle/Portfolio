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

const FeaturedPosts = ({ post }: { post: BentoPosts }) => {
  const tags: string = post.tags;

  return (
    <div className={`${post.colSpan} sm:h-[27rem] h-max`}>
      <Link to={`/blog/${post.slug}`} className="  ">
        <MagicCard
          className={`rounded-lg p-6 shadow-xs border-[${POSTS_CARD_GRADIENTS[post.tags]?.from ?? "#ffffff"}]`}
          gradientFrom={POSTS_CARD_GRADIENTS[post.tags]?.from ?? "#ffffff"}
          gradientTo={POSTS_CARD_GRADIENTS[post.tags]?.to ?? "#ffffff"}
          gradientColor={POSTS_CARD_GRADIENTS[post.tags]?.color ?? "#000000"}
          border={POSTS_CARD_GRADIENTS[post.tags]?.color ?? "#ffffff"}
        >
          <img
            src={post.image}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-500 group-hover:underline">
            {post.title}
          </h3>{" "}
          <p className="text-sm text-gray-400 mb-2">
            {new Date(post.date).toDateString()}
          </p>
          <p className="text-gray-400 mb-4">{post.excerpt}</p>
          <RainbowButton
            variant="outline"
            className={`flex-1 ${GRADIENT_BUTTON_CLASSNAME}`}
          >
            Read More
          </RainbowButton>
        </MagicCard>
      </Link>
    </div>
  );
};

export default FeaturedPosts;
