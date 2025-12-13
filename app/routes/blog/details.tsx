"use client";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import type { Route } from "./+types/details";
import type { BlogPostDetailsPageProps, PostMeta } from "~/types";
import { useNavigate } from "react-router";
import { getToc } from "./toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { SocialsDock } from "~/components/SocialsDock";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { ShareDock } from "~/components/ShareDock";
import PostMarkdown from "~/components/PostMarkdown";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const url = new URL("/data/posts-meta.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const index = await res.json();

  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("Not Found", { status: 404 });

  // Dynamically import raw markdown
  const markdown = await import(`/markdown/posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;
  const toc = getToc(markdown);
  const navigate = useNavigate();

  console.log(postMeta.devNotesLinks);

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  console.log(postMeta.image);

  const style: React.CSSProperties = {
    height: "100vh",
    width: "100%",
    background: `
      radial-gradient(circle at 20% 40%, rgba(255,180,200,0.55), transparent 60%),
      radial-gradient(circle at 80% 30%, rgba(180,220,255,0.55), transparent 60%),
      radial-gradient(circle at 50% 70%, rgba(200,255,220,0.50), transparent 65%),
      rgba(255,255,255,0.35)
    `,
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    position: "relative",
  };

  const container: React.CSSProperties = {
    position: "relative",
    minHeight: "380px",
    width: "100%",
    borderRadius: "18px",
    overflow: "hidden",
  };

  const rainbowLayer: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    // combine a soft linear rainbow + a couple of radial "color clouds"
    backgroundImage: `
      linear-gradient(90deg,
        rgba(255, 90, 90, 0.55) 0%,
        rgba(255, 160, 90, 0.45) 12%,
        rgba(180, 230, 120, 0.42) 28%,
        rgba(110, 225, 240, 0.4) 48%,
        rgba(125, 120, 255, 0.45) 68%,
        rgba(235, 110, 240, 0.5) 86%,
        rgba(255, 90, 90, 0.55) 100%
      ),
      radial-gradient(circle at 15% 30%, rgba(255,205,205,0.35), transparent 35%),
      radial-gradient(circle at 80% 20%, rgba(205,220,255,0.32), transparent 40%)
    `,
    transform: "scale(1.06)", // hide blurred edges
    filter: "blur(34px) saturate(140%)",
    willChange: "transform, filter",
    opacity: 1,
  };

  const frostedWash: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
    backdropFilter: "blur(8px) saturate(120%)",
    WebkitBackdropFilter: "blur(8px) saturate(120%)",
  };

  const vignette: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(1200px 400px at 50% 110%, rgba(0,0,0,0.06), transparent 30%)," +
      "linear-gradient(0deg, rgba(0,0,0,0.03), transparent 40%)",
  };

  const content: React.CSSProperties = {
    position: "relative",
    zIndex: 3,
    padding: "44px",
    color: "white",
    textShadow: "0 6px 18px rgba(10,10,10,0.45)",
    maxWidth: "920px",
  };

  const eyebrow: React.CSSProperties = {
    display: "inline-block",
    background: "rgba(255,255,255,0.12)",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    marginBottom: "18px",
    color: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(6px)",
  };

  return (
    <div className="">
      <title>{postMeta.title}</title>
      <meta name="description" content={postMeta.longExcerpt} />
      <meta property="og:title" content={postMeta.title} />
      <meta property="og:description" content={postMeta.longExcerpt} />

      <div className="px-6 pt-15 h-116 ">
        <ShareDock postSlug={postMeta.slug} postTitle={postMeta.title} />

        {/* BACKGROUND (absolute, behind content) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden max-w-6xl rounded-2xl mx-5 h-128 top-24 ">
          {/* subtle neutral base — very translucent so colors show through */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-gray-100/8" />

          {/* large blurred colorful "clouds" — higher alpha + large blur */}
          <div className="absolute -inset-[8%] opacity">
            <div className="absolute top-[6%] left-[8%] w-[40%] aspect-square rounded-full bg-gradient-to-r from-amber-500/70 to-yellow-200/70 blur-[64px]" />
            <div className="absolute top-[56%] left-[62%] w-[30%] aspect-square rounded-full bg-gradient-to-r from-green-400/70 to-blue-500/70 blur-[56px]" />
            <div className="absolute top-[36%] left-[28%] w-[24%] aspect-square rounded-full bg-gradient-to-r from-purple-400/70 to-pink-500/70 blur-[52px]" />
          </div>

          {/* horizontal rainbow band (blend mode helps it read on light backgrounds) */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="w-full h-full mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,90,90,0.28), rgba(255,160,90,0.22), rgba(180,230,120,0.24), rgba(110,225,240,0.24), rgba(125,120,255,0.26), rgba(235,110,240,0.28))",
              }}
            />
          </div>

          {/* tiny frosted layer to keep it glassy, but very low opacity */}
          <div className="absolute inset-0 backdrop-blur-[3px] bg-white/4" />
          <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-t from-black/20 via-black/5 to-transparent"></div>
        </div>
        {/* black overlay gradient (bottom → top) */}

        {/* CONTENT (relative, above background) */}
        <div className="relative z-10 flex flex-col justify-center h-full">
          <div className="max-w-5xl mx-auto px-4 md:px-0">
            <div className="inline-block bg-white/10 backdrop-blur-sm text-white dark:text-white rounded-full px-3 py-1 text-sm mb-4 border-1 border-white/70">
              {postMeta.tags} {" ── .✦"}{" "}
              {new Date(postMeta.date).toDateString()}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white leading-tight mb-3 max-w-2xl">
              {postMeta.title}
            </h1>

            <p className="text-lg text-white/80 dark:text-gray-200 max-w-2xl">
              {postMeta.longExcerpt}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl z-10 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto px-4 md:px-0 z-10 text-gray-500 mt-10 max-w-6xl">
          <main className="md:col-span-2 mt-10">
            <PostMarkdown markdown={markdown} pdfRoute={postMeta.pdfRoute} />
          </main>

          <aside className="md:block hidden md:col-span-1 bg-[#f9f9f9]    p-5 sticky top-24 h-fit mt-10">
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

            <div className="mt-10 p-5 border border-[#d1d5dc] rounded-lg bg-[#fefefe]">
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
                        ─ ✦ {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <hr className="my-5" />

            {/* {(postMeta.devNotesLinks?.length ?? 0) > 0 && (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Dev Notes</Button>
                  </SheetTrigger>

                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Developer Notes</SheetTitle>
                      <SheetDescription>
                        {postMeta.devNotesLinks!.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 underline hover:text-blue-800 mb-2"
                          >
                            {link}
                          </a>
                        ))}
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <hr className="my-5" />
              </>
            )} */}

            <Button
              variant={"outline"}
              className="border-[#d1d5dc] w-full"
              onClick={(e) => navigate("/blog")}
            >
              <ArrowLeft className="text-gray-600" />
              Back to Blog
            </Button>
          </aside>
        </div>
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
