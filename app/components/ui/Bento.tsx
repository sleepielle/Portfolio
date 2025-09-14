import type { IconProps } from "@radix-ui/react-icons/dist/types";
import type React from "react";
import type { IconType } from "react-icons/lib";
import type { PostMeta } from "~/types";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

type BentoProps = {
  latestPosts: PostMeta[];
};
const ICONS = [
  FileTextIcon,
  CalendarIcon,
  GlobeIcon,
  InputIcon,
  BellIcon,
] as const;

const GRID_CLASSES = [
  "col-span-3 lg:col-span-1",
  "col-span-3 lg:col-span-2",
  "col-span-3 lg:col-span-2",
  "col-span-3 lg:col-span-1",
] as const;

const Bento = (props: BentoProps) => {
  const { latestPosts } = props;

  const features = latestPosts.map((post, i) => ({
    Icon: ICONS[i % ICONS.length], // <-- single component, not array
    name: post.title,
    description: post.excerpt,
    href: post.slug, // ensure this matches BentoCard’s expected href

    cta: "Read more",
    background: post.image ? (
      <img
        src={post.image}
        alt=""
        className="absolute right-0 top-10 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
      />
    ) : (
      ""
    ),
    className: GRID_CLASSES[i % GRID_CLASSES.length], // <-- single string, not array
  }));
  return <div></div>;
};

export default Bento;
