import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const url = new URL("/posts-meta.json/", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("failed to fetch data");

  // putting the entire array on index
  const index = await res.json();

  // only getting the slug that matches postmeta
  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("Not Found", { status: 404 });

  // Get actual markdown content based on the slug of the file on postmeta
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return { postMeta, markdown: markdown.default };
}

type BlogPostDetailsPageProps = {
  loaderData: { postMeta: PostMeta; markdown: string };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;
  console.log(postMeta, markdown);
  return <>Blog</>;
};

export default BlogPostDetailsPage;
