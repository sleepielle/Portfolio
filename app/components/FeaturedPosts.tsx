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
import { PencilLine, PenTool } from "lucide-react";

const FeaturedPosts = ({ post }: { post: BentoPosts }) => {
  const tags: string = post.tags;

  return (
    <div className={`${post.colSpan} h-max`}>
      <Link to={`/blog/${post.slug}`} className="  ">
        <div
          className={`relative rounded-xl border-b-2 border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%]  [background-clip:padding-box,border-box,border-box] [background-origin:border-box]  `}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 0",
              maskImage: `
       repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
              WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <MagicCard
            className={`rounded-lg p-6 shadow-xs hover:shadow-sm hover:translate-y-1 border  `}
            gradientFrom="#ffffff"
            gradientTo="#ffffff"
            gradientSize={0}
          >
            <div className="bg-blue-300 flex rounded-full w-9 h-9 items-center">
              <PencilLine className="text-white text-center mx-auto" />
            </div>
            <span
              className={clsx(
                "flex items-center rounded-md cursor-pointer   transition-colors  mb-3 w-fit ",
                // selected styling (use a named color from tailwind config)
                post.tags && "bg-selected font-normal text-gray-400 "
                // notes styling (literal classes so Tailwind includes them)
                // post.tags.toString() === "Notes" &&
                //   "text-notes-color bg-notes-pastel border-notes-strong ",

                // post.tags.toString() === "Now" &&
                //   "text-now-color  border-now-strong bg-now-pastel ",

                // post.tags.toString() === "Research" &&
                //   "text-research-color  border-research-strong  ",

                // post.tags.toString() === "Snippets" &&
                //   "text-snippets-color  border-snippets-strong bg-snippets-pastel "
              )}
            ></span>
            <h3 className="text-xl  text-gray-600 group-hover:underline">
              {post.title}
            </h3>{" "}
            <p className=" text-gray-500 my-2">{post.excerpt}</p>
            <p className=" text-gray-400  mb-4">
              {post.tags} ✦{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </MagicCard>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedPosts;
