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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const PostCard = ({ post }: { post: BentoPosts }) => {
  return (
    <div className={`${post.colSpan} sm:h-[25rem] h-max  sm:w-[22rem] `}>
      <Link to={`/blog/${post.slug}`} className="block">
        <Tooltip>
          <TooltipContent>
            <p>Click to read more</p>
          </TooltipContent>
          <TooltipTrigger className="cursor-pointer">
            <MagicCard
              className={`rounded-lg align-start justify-start hover:translate-y-1 hover:shadow-sm  border-[${POSTS_CARD_GRADIENTS[post.tags]?.from ?? "#339df9"}]`}

              //  border={POSTS_CARD_GRADIENTS[post.tags]?.color ?? "#ffffff"}
            >
              <img
                src={post.image}
                className="w-full h-48 object-cover rounded mb-4  "
              />
              {/* <span
            className={clsx(
              "flex items-center px-2 rounded-md cursor-pointer border text-sm transition-colors ml-5 mb-3 w-fit",
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
          </span> */}
              <div className="px-6 flex-col gap-2 pt-2 pb-4 ">
                <div className="text-start mt-2">
                  <h3 className="text-xl font-semibold text-gray-600 max-w-[25ch] group-hover:underline my-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 mb-3">{post.shortExcerpt}</p>
                </div>

                <div className="text-sm text-gray-400 my-2 ">
                  <p className="text-start">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </MagicCard>
          </TooltipTrigger>
        </Tooltip>
      </Link>
    </div>
  );
};

export default PostCard;
