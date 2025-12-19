import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import type { Route } from "../+types/root";
import remarkGfm from "remark-gfm";
import { getToc } from "~/routes/blog/toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import rehypeRaw from "rehype-raw";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { cn } from "~/lib/utils";

// Im
const Markdown = ({
  markdown,
  pdfRoute,
  smallText,
  mediumText,
  largeText,
}: {
  markdown: string;
  pdfRoute?: string;
  smallText?: boolean;
  mediumText?: boolean;
  largeText?: boolean;
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      {" "}
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append" }],
        ]}
        components={{
          h1: (props) => (
            <h1
              {...props}
              className={cn(
                " font-extrabold tracking-tight text-gray-600 mt-8 mb-4",
                smallText === true && "text-4xl",
                mediumText === true && "text-5xl",
                largeText === true && "text-6xl"
              )}
            />
          ),
          h2: (props) => (
            <h2
              {...props}
              className={cn(
                " font-bold text-gray-500 mt-10 mb-3",
                smallText === true && "text-3xl",
                mediumText === true && "text-4xl",
                largeText === true && "text-5xl"
              )}
            />
          ),
          h3: (props) => (
            <h3
              {...props}
              className={cn(
                "font-semibold text-gray-500 mt-8 mb-2",
                smallText === true && "text-2xl",
                mediumText === true && "text-3xl",
                largeText === true && "text-4xl"
              )}
            />
          ),
          p: (props) => (
            <p
              {...props}
              className={cn(
                "text-gray-500",
                smallText === true && "text-base",
                mediumText === true && "text-lg",
                largeText === true && "text-xl"
              )}
            />
          ),
          a: (props) => (
            <a
              {...props}
              className={cn(
                "text-blue-400 underline underline-offset-4 hover:text-blue-300",
                smallText === true && "text-base",
                mediumText === true && "text-lg",
                largeText === true && "text-xl"
              )}
            />
          ),
          blockquote: (props) => (
            <blockquote
              {...props}
              className={cn(
                "border-l-4 border-blue-500/60 pl-4 italic bg-blue-500/10 rounded",
                smallText === true && "text-base",
                mediumText === true && "text-lg",
                largeText === true && "text-xl"
              )}
            />
          ),
          br: () => <div className="h-8" />,
          ul: (props) => (
            <ul
              {...props}
              className={cn(
                "list-disc list-inside pl-2 text-gray-500 my-4",
                smallText === true && "text-base",
                mediumText === true && "text-lg",
                largeText === true && "text-xl"
              )}
            />
          ),
          li: (props) => (
            <li
              {...props}
              className={cn(
                "text-gray-500 list-disc list-inside pl-2",
                smallText === true && "text-base",
                mediumText === true && "text-lg",
                largeText === true && "text-xl"
              )}
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
                className={cn(
                  "bg-white/10 px-1.5 py-0.5 rounded  ",
                  smallText === true && "text-base",
                  mediumText === true && "text-lg",
                  largeText === true && "text-xl"
                )}
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
              <table
                {...props}
                className={cn(
                  "table-auto w-full text-gray-500 text-left",
                  smallText === true && "text-base",
                  mediumText === true && "text-lg",
                  largeText === true && "text-xl"
                )}
              />
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
      {pdfRoute && (
        <div className="mt-20">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "750px",
              }}
            >
              <Viewer
                plugins={[defaultLayoutPluginInstance]}
                fileUrl={pdfRoute.toString()}
              />
            </div>
          </Worker>
        </div>
      )}
    </>
  );
};

export default Markdown;
