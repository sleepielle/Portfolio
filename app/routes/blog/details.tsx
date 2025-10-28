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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
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
  const markdown = await import(`../../posts/${slug}.md?raw`);

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
  return (
    <>
      <title>{postMeta.title}</title>
      <meta name="description" content={postMeta.excerpt} />
      <meta property="og:title" content={postMeta.title} />
      <meta property="og:description" content={postMeta.excerpt} />

      <div className="w-full mx-auto px-6 py-12 ">
        <ShareDock postSlug={postMeta.slug} postTitle={postMeta.title} />
        <div className="flex-col items-center gap-2 mb-5  top-20 z-15"></div>
        <div className="relative w-full h-64 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-white/50 z-10 opacity-60"></div>
          <img
            src={postMeta.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto px-4 md:px-0 z-10 text-gray-500 mt-10">
          <main className="md:col-span-2">
            <div className="mb-5">
              <h1 className="text-4xl font-bold text-gray-600 mb-2 ">
                {postMeta.title}
              </h1>
              <p className="text-gray-500 text-lg">{postMeta.excerpt}</p>
              <div className="flex items-center">
                {" "}
                <p className=" text-gray-400 mt-1 ">
                  {postMeta.tags} {" ── .✦"}{" "}
                  {new Date(postMeta.date).toDateString()}
                </p>
              </div>
            </div>
            <hr />

            <PostMarkdown markdown={markdown} pdfRoute={postMeta.pdfRoute} />
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

            {(postMeta.devNotesLinks?.length ?? 0) > 0 && (
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
            )}

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
    </>
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
