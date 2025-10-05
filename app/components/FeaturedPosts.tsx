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

const FeaturedPosts = ({ post }: { post: BentoPosts }) => {
  const tags: string = post.tags;

  return (
    <div className={`${post.colSpan} sm:h-[27rem] h-max`}>
      <Link to={`/blog/${post.slug}`} className="  ">
        <MagicCard
          className={`rounded-lg p-6 shadow-xs`}
          gradientFrom={POSTS_CARD_GRADIENTS[post.tags]?.from ?? "#ffffff"}
          gradientTo={POSTS_CARD_GRADIENTS[post.tags]?.to ?? "#ffffff"}
          gradientColor={POSTS_CARD_GRADIENTS[post.tags]?.color ?? "#000000"}
        >
          <img
            src={post.image}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <span
            className={clsx(
              "flex items-center px-2 rounded-md cursor-pointer border text-sm transition-colors  mb-3 w-fit",
              // selected styling (use a named color from tailwind config)
              post.tags && "bg-selected text-primary font-semibold",
              // notes styling (literal classes so Tailwind includes them)
              post.tags.toString() === "Notes" &&
                "text-notes-color  border-notes-strong bg-notes-pastel ",

              post.tags.toString() === "Now" &&
                "text-now-color  border-now-strong bg-now-pastel ",

              post.tags.toString() === "Research" &&
                "text-research-color  border-research-strong bg-research-pastel ",

              post.tags.toString() === "Snippets" &&
                "text-snippets-color  border-snippets-strong bg-snippets-pastel "
            )}
          >
            {post.tags}
          </span>
          <h3 className="text-xl font-semibold text-gray-600 group-hover:underline">
            {post.title}
          </h3>{" "}
          <p className="text-gray-500 my-2">{post.excerpt}</p>
          <p className="text-sm text-gray-400  mb-4">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
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
