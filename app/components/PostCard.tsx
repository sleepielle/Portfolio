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

const PostCard = ({ post }: { post: BentoPosts }) => {
  return (
    <div className={`${post.colSpan}`}>
      <Link
        to={`/blog/${post.slug}`}
        className=" hover:transition hover:duration-300 hover:ease-in-out "
      >
        <MagicCard className=" p-6 rounded-lg  mb-4 hover:border-1 hover:border-[#e4ff3b] hover:transition hover:duration-300">
          <img
            src={post.image}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-2xl font-semibold text-blue-400">{post.title}</h3>
          <p className="text-sm text-gray-400 mb-2">
            {new Date(post.date).toDateString()}
          </p>
          <p className="text-gray-400 mb-4">{post.excerpt}</p>
          <Link
            to={`/blog/${post.slug}`}
            className="text-blue-400 text-sm hover:underline"
          >
            Read More →
          </Link>
        </MagicCard>
      </Link>
    </div>
  );
};

export default PostCard;
