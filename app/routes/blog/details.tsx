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
import { SocialsDock } from "~/components/SocialsDock";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const url = new URL("/data/posts-meta.json", request.url);
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
    <div className="w-full mx-auto px-6 py-12 ">
      <SocialsDock />
      <div>
        <Link
          to="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Back To Posts
        </Link>

        {postMeta.tags}
      </div>

      <div className="mb-5">
        <h1 className="text-5xl font-bold text-gray-600 mb-2">
          {postMeta.title}
        </h1>
        <p className="text-gray-500 text-xl">{postMeta.excerpt}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto px-4 md:px-0 z-10 text-gray-500">
        <main className="md:col-span-2">
          <img
            src={postMeta.image}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <p className="text sm text-gray-400 mb-6">
            {new Date(postMeta.date).toDateString()}
          </p>
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
                  className="text-4xl font-extrabold tracking-tight text-gray-600 mt-8 mb-4"
                />
              ),
              h2: (props) => (
                <h2
                  {...props}
                  className="text-3xl font-bold text-gray-500 mt-10 mb-3"
                />
              ),
              h3: (props) => (
                <h3
                  {...props}
                  className="text-2xl font-semibold text-gray-500 mt-8 mb-2"
                />
              ),
              p: (props) => <p {...props} className="text-gray-500" />,
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

        <aside className="md:block hidden md:col-span-1 bg-[#f9f9f9] border border-gray-200 rounded-lg p-5 sticky top-24 h-fit">
          <div className=" flex justify-start items-center gap-3">
            <img
              className="rounded-full w-10 h-10"
              src="../../../images/profile.jpeg"
            />
            <div className=" flex flex-col justify-start items-start">
              <p className="font-semibold text-sm">Mercedes Paz</p>
              <span className="text-xs">Computer Systems Engineer</span>
            </div>
          </div>

          <div className="mt-10 p-5 border border-gray-400 rounded-lg bg-white">
            <nav>
              <p className="font-semibold pb-3 border-b-gray-300 text-sm">
                On this page
              </p>

              <ul className="space-y-1 text-sm">
                {toc.map(({ id, text, depth }) => (
                  <li key={id} className={depth > 2 ? "pl-4" : ""}>
                    <a
                      href={`#${id}`}
                      className="block text-slate-400 hover:font-semibold"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostDetailsPage;

/**
export async function loader({ request, 
params }: Route.LoaderArgs) {
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
