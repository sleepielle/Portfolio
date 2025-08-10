import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const url = new URL("/posts-meta.json", request.url);
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
  return (
    <div className="max-w-2xl mx-auto px-6 py-2 bg-gray-900">
      <h1 className="text-2xl font-bold text-blue-400 mb-2">
        {postMeta.title}
      </h1>
      <p className="text sm text-gray-400 mb-6">
        {new Date(postMeta.date).toDateString()}
      </p>

      <div className="prose prose-invert max-2-none mb-12">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <Link
        to="/blog"
        className="inline-block bg-blue-600 text-white px-6 rounded-lg py-2 hover:bg-blue-500 transition"
      >
        Back to Posts
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
