import type { Route } from "./+types/details";
import type { ProjectDetailsPageProps, Projects } from "~/types";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import PostMarkdown from "~/components/PostMarkdown";
import { getToc } from "../blog/toc";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  // Use the request URL to construct absolute URLs for fetch
  const slug = params.slug;
  const url = new URL("/data/projects.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

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

  const markdown = await import(`../../projects/${project.slug}.md?raw`);

  console.log(markdown);
  return { project, markdown: markdown.default };
}

const ProjectDetailsPage = ({ loaderData }: ProjectDetailsPageProps) => {
  const { project, markdown } = loaderData;
  const toc = getToc(markdown);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen ">
      <div className="w-full mx-auto px-6 py-12 ">
        <div className="flex-col items-center gap-2 mb-5  top-20 z-15"></div>
        <div className="relative w-full h-64 rounded overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-white/50 z-10 opacity-60"></div>
          <img
            src={project?.image ? project?.image : "/images/no-image.png"}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto px-4 md:px-0 z-10 text-gray-500 mt-10">
          <main className="md:col-span-2">
            <div className="mb-5">
              <h1 className="text-4xl font-bold text-gray-600 mb-2 ">
                {project?.title}
              </h1>
              <p className="text-gray-500 text-lg">{project?.description}</p>
              <div className="flex items-center">
                {" "}
                <p className=" text-gray-400 mt-1 ">
                  {project?.category} {" ── .✦"}{" "}
                  {new Date(project?.date).toDateString()}
                </p>
              </div>
            </div>
            <hr />

            <PostMarkdown markdown={markdown} />
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

            <Button
              variant={"outline"}
              className="border-[#d1d5dc] w-full"
              onClick={(e) => navigate("/projects")}
            >
              <ArrowLeft className="text-gray-600" />
              Back to Projects
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
