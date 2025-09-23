import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";
import { Link } from "react-router";
import remarkGfm from "remark-gfm";
import { getToc } from "./toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

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
  const toc = getToc(markdown);

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

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
        <aside className="lg:block hidden">
          <div className="sticky top-6">
            <h2 className="text-sm font-semibold text-slate-300 mb-3">
              On this page
            </h2>
            <nav>
              <ul className="space-y-1 text-sm">
                {toc.map(({ id, text, depth }) => (
                  <li key={id} className={depth > 2 ? "pl-4" : ""}>
                    <a
                      href={`#${id}`}
                      className="block text-slate-400 hover:text-blue-300"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <main>
          <ReactMarkdown
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "append" }],
            ]}
            components={{
              h1: (props) => (
                <h1
                  {...props}
                  className="text-4xl font-extrabold tracking-tight text-blue-400 mt-8 mb-4"
                />
              ),
              h2: (props) => (
                <h2
                  {...props}
                  className="text-3xl font-bold text-blue-300 mt-10 mb-3"
                />
              ),
              h3: (props) => (
                <h3
                  {...props}
                  className="text-2xl font-semibold text-blue-200 mt-8 mb-2"
                />
              ),
              a: (props) => (
                <a
                  {...props}
                  className="text-blue-400 underline underline-offset-4 hover:text-blue-300"
                />
              ),
              blockquote: (props) => (
                <blockquote
                  {...props}
                  className="border-l-4 border-blue-500/60 pl-4 italic bg-blue-500/10 rounded"
                />
              ),
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                if (!inline && match) {
                  return (
                    <SyntaxHighlighter
                      {...props}
                      language={match[1]}
                      style={oneDark}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: "0.5rem",
                        padding: "1rem",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                }
                // inline code
                return (
                  <code
                    {...props}
                    className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-[0.9em]"
                  >
                    {children}
                  </code>
                );
              },
              // images: make them responsive and rounded
              img: (props) => (
                <img {...props} className="rounded-lg mx-auto max-h-96" />
              ),
              table: (props) => (
                <div className="overflow-x-auto">
                  <table {...props} className="table-auto w-full" />
                </div>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </main>
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
