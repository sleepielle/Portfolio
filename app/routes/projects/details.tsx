import type { Route } from "./+types/details";
import type { ProjectDetailsPageProps, Projects } from "~/types";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import PostMarkdown from "~/components/PostMarkdown";
import { getToc } from "../blog/toc";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import clsx from "clsx";

export async function loader({ request, params }: Route.LoaderArgs) {
  // Use the request URL to construct absolute URLs for fetch
  const slug = params.slug;
  console.log("SLUG", slug);
  const url = new URL("/data/projects.json", request.url);
  const res = await fetch(url.href);

  console.log("RESPONSE ", res);
  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();
  console.log("DATA", data);

  if (!data?.data) throw new Error("Invalid JSON structure");

  const project = data.data.find((p: Projects) => p.slug === slug);
  if (!project) throw new Response("Not Found", { status: 404 });

  // ✅ Normalize image path — always return a string URL
  const normalizedProject = {
    ...project,
    image:
      typeof project.image === "object" && project.image?.url
        ? project.image.url
        : "/images/no-image.png",
  };

  const markdown = await import(
    `../../../public/markdown/projects/${project.slug}.md?raw`
  );

  // const markdown = await import(
  //   `../../markdown/projects/${project.slug}.md?raw`
  // );

  console.log(markdown);
  return { project, markdown: markdown.default };
}

const ProjectDetailsPage = ({ loaderData }: ProjectDetailsPageProps) => {
  const { project, markdown } = loaderData;
  const toc = getToc(markdown);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-6xl">
      <div className="w-full   py-12 ">
        <div className="px-6 pt-15 h-116 ">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden max-w-6xl rounded-2xl mx-5 lg:mx-auto p-5 h-128 top-24 ">
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-gray-100/8" />

            {/* large blurred colorful "clouds" — higher alpha + large blur */}
            <div className="absolute -inset-[8%] opacity">
              <div
                className={clsx(
                  "absolute top-[6%] left-[8%] w-[40%] aspect-square rounded-full",
                  project.category.toString() === "Frontend" &&
                    "  bg-gradient-to-r  from-purple-500/60 to-purple-200/60 blur-[64px]"
                )}
              />
              <div
                className={clsx(
                  "absolute top-[56%] left-[62%] w-[30%] aspect-square rounded-full",
                  project.category.toString() === "Frontend" &&
                    "  bg-gradient-to-r  from-purple-700/60 to-purple-300/60 blur-[56px]"
                )}
              />
              <div
                className={clsx(
                  "absolute top-[36%] left-[28%] w-[24%] aspect-square rounded-full",
                  project.category.toString() === "Frontend" &&
                    "  bg-gradient-to-r  from-purple-700/60 to-purple-300/60 blur-[52px]"
                )}
              />
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <div
                className="w-full h-full mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,90,90,0.28), rgba(255,160,90,0.22), rgba(180,230,120,0.24), rgba(110,225,240,0.24), rgba(125,120,255,0.26), rgba(235,110,240,0.28))",
                }}
              />
            </div>

            <div className="absolute inset-0 backdrop-blur-[3px] bg-white/4" />
            <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center h-full">
            <div className="max-w-5xl mx-auto px-4 md:px-0">
              <div className="inline-block bg-white/10 backdrop-blur-sm text-white dark:text-white rounded-full px-3 py-1 text-sm mb-4 border-1 border-white/60">
                {project.category} {" ── .✦"}{" "}
                {new Date(project.date).toDateString()}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white leading-tight mb-3 max-w-2xl">
                {project.title}
              </h1>

              <p className="text-lg text-white/80 dark:text-gray-200 max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto px-4 md:px-0 z-10 text-gray-500 mt-10 ">
          <main className="md:col-span-2">
            <PostMarkdown markdown={markdown} />
          </main>

          <aside className="md:block hidden md:col-span-1 rounded-lg p-5 sticky top-24 h-fit">
            <div className="mt-10 p-5 ">
              <nav>
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
              <hr className="my-5" />

              <div className=" flex justify-start items-center gap-3 mt-5">
                <img
                  className="rounded-full w-10 h-10"
                  src="../../../images/profile.jpeg"
                />
                <div className=" flex flex-col justify-start items-start">
                  <p className="font-semibold text-sm">Mercedes Paz</p>
                  <span className="text-xs">Computer Systems Engineer</span>
                </div>
              </div>
              <hr className="my-5" />

              <Button
                variant={"outline"}
                className="border-[#d1d5dc] w-full"
                onClick={(e) => navigate("/projects")}
              >
                <ArrowLeft className="text-gray-600" />
                Back to Projects
              </Button>
            </div>

            {/* {(project.devNotesLinks?.length ?? 0) > 0 && (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Dev Notes</Button>
                  </SheetTrigger>

                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Developer Notes</SheetTitle>
                      <SheetDescription>
                        {project.devNotesLinks!.map((link, index) => (
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
