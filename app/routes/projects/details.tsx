import type { Route } from "./+types/details";
import type { ProjectDetailsPageProps, Projects } from "~/types";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import PostMarkdown from "~/components/Markdown";
import { getToc } from "../blog/toc";
import { Button } from "~/components/ui/button";
import {
  ArrowLeft,
  Circle,
  LetterTextIcon,
  TableOfContentsIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { WidthIcon } from "@radix-ui/react-icons";
import {} from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { RainbowButton } from "~/components/ui/rainbow-button";

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

  const [smallText, setSmallText] = useState(true);
  const [mediumText, setMediumText] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const [smallWidth, setSmallWidth] = useState(true);
  const [mediumWidth, setMediumWidth] = useState(false);
  const [largeWidth, setLargeWidth] = useState(false);

  const clickSmallText = () => {
    setLargeText(false);
    setMediumText(false);
    setSmallText(true);
  };

  const clickMediumText = () => {
    setSmallText(false);
    setLargeText(false);
    setMediumText(true);
  };

  const clickLargeText = () => {
    setSmallText(false);
    setMediumText(false);
    setLargeText(true);
  };
  const clickSmallWidth = () => {
    setLargeWidth(false);
    setMediumWidth(false);
    setSmallWidth(true);
  };

  const clickMediumWidth = () => {
    setSmallWidth(false);
    setLargeWidth(false);
    setMediumWidth(true);
  };

  const clickLargeWidth = () => {
    setSmallWidth(false);
    setMediumWidth(false);
    setLargeWidth(true);
  };

  return (
    <div
      className={cn(
        "min-h-screen mx-auto  overflow-x-hidden",
        smallWidth === true && "sm:w-2xl md:w-3xl lg:w-4xl xl:w-5xl  ",
        mediumWidth === true && "w-7xl lg:-translate-x-20 ",
        largeWidth === true &&
          "sm:w-[60sm] md:w-[68rem]  lg:w-[76rem]  xl:w-[84rem] -translate-x-25"
      )}
    >
      <div className="w-full py-12 -top-10 relative ">
        <div className="px-6 pt-15 h-116 w-full ">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden max-w-full  rounded-2xl  lg:mx-auto p-5 h-100 top-24 ">
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-gray-100/8" />

            {/* large blurred colorful "clouds" — higher alpha + large blur */}
            <div className="absolute -inset-[8%] opacity ">
              <div
                className={clsx(
                  " absolute  aspect-square rounded-full",
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
                className="hidden sm:flex w-full h-full mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,90,90,0.28), rgba(255,160,90,0.22), rgba(180,230,120,0.24), rgba(110,225,240,0.24), rgba(125,120,255,0.26), rgba(235,110,240,0.28))",
                }}
              />

              <div className="sm:hidden w-full h-full mix-blend-overlay bg-gradient-to-b from-purple-200 to-purple-400" />
            </div>

            <div className="absolute inset-0 backdrop-blur-[3px] bg-white/4" />
            <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col justify-center h-full">
            <div className="max-w-5xl mx-auto px-4 md:px-0">
              <div className="inline-block bg-white/10 backdrop-blur-sm text-white rounded-full px-3 py-1 text-sm mb-4 border-1 border-white/60 shadow-md [text-shadow:0_2px_8px_rgba(0,0,0,0.40)]">
                {project.category} {" ── .✦"}{" "}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white  leading-tight mb-3  md:max-w-2xl  [text-shadow:0_2px_8px_rgba(0,0,0,0.40)] ">
                {project.title}
              </h1>

              <p className="text-lg text-white/80  max-w-2xl [text-shadow:0_2px_8px_rgba(0,0,0,0.40)] ">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 mx-auto md:px-4 lg:px-0 z-10 text-gray-500 mt-10 ">
          <main className=" col-span-3 md:col-span-3 lg:col-span-2">
            <PostMarkdown
              markdown={markdown}
              smallText={smallText}
              mediumText={mediumText}
              largeText={largeText}
            />
          </main>

          {/**DESKTOP TOC AND A11Y */}
          <aside className="hidden lg:block sticky top-28 md:col-span-1 rounded-lg px-5">
            {" "}
            <div className="px-5 ">
              <nav>
                <ul className="space-y-1 text-sm">
                  {toc.map(({ id, text, depth }) => (
                    <li key={id} className={depth > 2 ? "pl-4" : ""}>
                      <a
                        href={`#${id}`}
                        className="block text-gray-500 hover:font-semibold"
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
              <div className="flex justify-between items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                      onClick={() => clickSmallText()}
                    >
                      <LetterTextIcon className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Small text</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                      onClick={() => clickMediumText()}
                    >
                      <LetterTextIcon className="size-6" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Medium text</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                      onClick={() => clickLargeText()}
                    >
                      <LetterTextIcon className="size-8" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Large text</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <hr className="hidden  xl:flex xl:my-5" />
              <div className="hidden xl:flex justify-between items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                      onClick={() => clickSmallWidth()}
                    >
                      <WidthIcon className="size-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Small width</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                      onClick={() => clickMediumWidth()}
                    >
                      <WidthIcon className="size-6" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Medium width</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center hover:bg-blue-200 "
                      onClick={() => clickLargeWidth()}
                    >
                      <WidthIcon className="size-8 hover:text-blue-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Large width</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <hr className="my-5" />

              <RainbowButton
                variant={"outline"}
                className=" w-full"
                onClick={(e) => navigate("/projects")}
              >
                <ArrowLeft className="text-gray-600" />
                Back to Projects
              </RainbowButton>
            </div>
          </aside>

          {/**MOBILE TOC AND A11Y  sm:left-[75%] lg:left-[80%]*/}
          <div className="fixed  lg:hidden  float    bottom-4 z-50  flex justify-center items-center  mx-auto w-fit  left-[90%] bg-white rounded-lg  ">
            <div>
              <Sheet>
                <SheetTrigger className="">
                  <Button variant="outline" className="shadow-md bg-white">
                    <TableOfContentsIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="max-h-[85vh] overflow-y-auto rounded-t-2xl"
                  side="bottom"
                >
                  <div className="grid gap-4 p-5 text-gray-500  rounded-t-full">
                    <aside className="sm:block lg:hidden md:col-span-1 rounded-lg  sticky h-fit ">
                      <div className="px-5 ">
                        <nav>
                          <ul className="space-y-1 text-sm">
                            {toc.map(({ id, text, depth }) => (
                              <li key={id} className={depth > 2 ? "pl-4" : ""}>
                                <a
                                  href={`#${id}`}
                                  className="block text-gray-500 hover:font-semibold"
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
                            <p className="font-semibold text-sm">
                              Mercedes Paz
                            </p>
                            <span className="text-xs">
                              Computer Systems Engineer
                            </span>
                          </div>
                        </div>

                        <hr className="my-5" />
                        <div className="flex justify-between items-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                                onClick={() => clickSmallText()}
                              >
                                <LetterTextIcon className="size-4" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Small text</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                                onClick={() => clickMediumText()}
                              >
                                <LetterTextIcon className="size-6" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Medium text</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                                onClick={() => clickLargeText()}
                              >
                                <LetterTextIcon className="size-8" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Large text</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <hr className="my-5" />
                        <div className=" justify-between items-center hidden lg:block ">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                                onClick={() => clickSmallWidth()}
                              >
                                <WidthIcon className="size-4" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Small width</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center"
                                onClick={() => clickMediumWidth()}
                              >
                                <WidthIcon className="size-6" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Medium width</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="size-10 rounded-full border-1 border-gray-300 flex items-center justify-center hover:bg-blue-200 "
                                onClick={() => clickLargeWidth()}
                              >
                                <WidthIcon className="size-8 hover:text-blue-500" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Large width</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <hr className="my-5 hidden lg:block " />

                        <RainbowButton
                          variant={"outline"}
                          className="w-full"
                          onClick={(e) => navigate("/projects")}
                        >
                          <ArrowLeft className="text-gray-600" />
                          Back to Projects
                        </RainbowButton>
                      </div>
                    </aside>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
