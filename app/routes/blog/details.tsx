import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta, StrapiResponse, StrapiPost } from "~/types";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const index = await res.json();

  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("Not Found", { status: 404 });

  // Dynamically import raw markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}
type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
};
const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <img
        src={postMeta.image}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold text-blue-400 mb-2">
        {postMeta.title}
      </h1>
      <p className="text sm text-gray-400 mb-6">
        {new Date(postMeta.date).toDateString()}
      </p>

      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <Link
        to="/blog"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ← Back To Posts
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;

/**
export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`
  );

  if (!res.ok) throw new Error("Failed ot fectch data");

  const json: StrapiResponse<StrapiPost> = await res.json();

  if (!json.data.length) throw new Response("Not Found", { status: 404 });

  const item = json.data[0];
  const post = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  };

  return { post };
}
 */
