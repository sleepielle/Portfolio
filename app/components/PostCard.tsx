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
    <div className={`${post.gridClass}`}>
      <MagicCard className=" p-6 rounded-lg shadow mb-4">
        <img
          src={post.image}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h3 className="text-2xl font-semibold text-blue-400">{post.title}</h3>
        <p className="text-sm text-gray-400 mb-2">
          {new Date(post.date).toDateString()}
        </p>
        <p className="text-gray-300 mb-4">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-blue-300 text-sm hover:underline"
        >
          Read More →
        </Link>
      </MagicCard>
    </div>
  );
};

export default PostCard;
