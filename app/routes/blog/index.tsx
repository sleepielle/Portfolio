"use client";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta, TagCounts } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";
import { SocialsDock } from "~/components/SocialsDock";
import clsx from "clsx";
import { Ellipsis, XIcon } from "lucide-react";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { Link } from "react-router";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Blog " },
    { name: "description", content: "Mercedes Paz's Portfolio" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("data/posts.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const postsPerPage = 6;

  const { posts } = loaderData;

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.longExcerpt.toLowerCase().includes(query) ||
      post.shortExcerpt.toLowerCase().includes(query)
    );
  });

  console.log(filteredPosts);
  const filteredTags =
    selectedTag === "All"
      ? filteredPosts
      : filteredPosts.filter((post) => post.tags.toString() === selectedTag);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredTags.slice(indexOfFirst, indexOfLast);

  const availableFilteredPosts = filteredTags.filter(
    (post) => post.availableToPublish === true
  );

  // Get # of posts per tag

  // Calculate counts for ALL posts (not filtered/paginated)
  const numberPostsPerTag: TagCounts = {
    All: posts.length,
    Notes: posts.filter((post) => post.tags === "Notes").length,
    Snippets: posts.filter((post) => post.tags === "Snippets").length,
    Now: posts.filter((post) => post.tags === "Now").length,
    Research: posts.filter((post) => post.tags === "Research").length,
  };

  //removing duplicate tags
  const tags: string[] = ["All", ...new Set(posts.flatMap((p) => p.tags))];

  useEffect(() => {
    return () => {
      if (searchQuery.length > 0) {
        setSelectedTag("All");
      }
    };
  }, [searchQuery]);

  const handleOpenMenu = () => {
    setSearchQuery("");
    setMenuOpen(!menuOpen);
  };

  const controls = useAnimation();
  return (
    <div className=" max-w-7xl w-full  min-h-screen  translate-y-1/44 sm:translate-y-0  ">
      {availableFilteredPosts.length === 0 &&
      selectedTag.toString() === "All" ? (
        <AnimatePresence>
          <motion.div
            key="blog-page-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            onViewportEnter={() => {
              controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              });
            }}
            onViewportLeave={() => {
              controls.start({
                opacity: 0.9,
                y: 1,
                transition: { duration: 0.25, ease: "easeOut" },
              });
            }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="translate-y-3 sm:w-full sm:-translate-y-5 group relative rounded-2xl   transition-all duration-300 h-full  "
          >
            <img
              src="/images/general/no-posts.png"
              className="animate-pulse duration-300 ease-in-out"
            />
            <div className="mx-auto text-center">
              <h2 className="text-3xl text-primary  text-center tracking-tighter mb-8">
                Knowledge Lab
              </h2>
              <p className="text-center text-gray-500 mb-8 mt-2  max-w-[30ch] sm:max-w-[50ch] mx-auto">
                This is my knowledge lab 🧪 A mix of code notes, industry
                research paper breakdowns, summaries, what I'm currently
                learning, among others.
                <br />
                <br />
                <b> Stay tuned for future posts!</b> In the meantime, take a
                look at my projects or contact me.
              </p>
              <div className="flex gap-2 items-center justify-center text-gray-500 mt-8">
                <RainbowButton
                  variant={"outline"}
                  className={`${GRADIENT_BUTTON_CLASSNAME}`}
                >
                  <Link to={"/projects"}>Projects</Link>
                </RainbowButton>

                <RainbowButton variant={"outline"}>
                  <Link to={"/contact"}>Contact Me</Link>
                </RainbowButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          <>
            <AnimatePresence>
              <motion.div
                key="blog-page-data"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative rounded-2xl bg-white border border-transparent 
                transition-all duration-300 "
              >
                <h2 className="text-4xl text-primary  text-center tracking-tighter ">
                  Blog
                </h2>
                <p className="text-center text-sm text-gray-400 mb-8 mt-2 max-w-[50ch] mx-auto">
                  This is my knowledge lab 🧪 — a mix of code notes, industry
                  research paper breakdowns and summaries, what I'm currently
                  learning, among others. Take a look around :)
                </p>
                <div className="flex flex-wrap gap-2  justify-between items-center">
                  <div className="hidden sm:flex sm:justify-between sm:items-center sm:gap-1">
                    {tags.map((tag, i) => (
                      <button
                        className={clsx(
                          "h-8 flex items-center px-1 pl-3 rounded-full cursor-pointer border text-sm transition-colors hover:border-2  ",
                          selectedTag === tag &&
                            "bg-selected text-primary font-semibold",
                          tag === "All" &&
                            "text-primary hover:border-2 hover:border-blue-500  ",
                          tag === "Notes" &&
                            "text-notes-color border-notes-strong bg-notes-pastel hover:border-2  ",
                          tag === "Now" &&
                            "text-now-color border-now-strong bg-now-pastel hover:border-2  ",
                          tag === "Research" &&
                            "text-research-color border-research-strong bg-research-pastel hover:border-2  ",
                          tag === "Snippets" &&
                            "text-snippets-color border-snippets-strong bg-snippets-pastel hover:border-2  "
                        )}
                        key={tag}
                        onClick={() => {
                          setSelectedTag(tag);
                          setCurrentPage(1);
                        }}
                      >
                        <span
                          className={`${selectedTag === tag && "font-bold"}`}
                        >
                          {tag}
                        </span>

                        {/* Show only the count for this specific tag */}
                        <span
                          className={`ml-2 text-xs  h-6 min-w-6 font-medium flex items-center justify-center ${selectedTag === tag && "text-blue  font-bold"}`}
                        >
                          {numberPostsPerTag[tag]}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center  w-full sm:w-fit gap-10">
                    <button onClick={handleOpenMenu}>
                      <div className="font-bold text-2xl  flex items-center h-8 p-4 rounded-lg cursor-pointer   transition-colors hover:border-2 sm:hidden shadow-xs border">
                        {!menuOpen ? (
                          <Ellipsis className="font-bold text-2xl text-gray-400 " />
                        ) : (
                          <XIcon className="" />
                        )}
                      </div>
                    </button>

                    {/* Mobile Dropdown  */}
                    {menuOpen && (
                      <div className="flex-col sm:hidden absolute top-[22rem] bg-white/70 z-10 w-[10rem] p-5 rounded-2xl border shadow-md gap-16 backdrop-blur-3xl ">
                        {tags.map((tag, i) => (
                          <button
                            key={tag}
                            className={clsx(
                              "h-8 flex items-center px-1 pl-3 rounded-full cursor-pointer border text-sm transition-colors hover:border-2 gap-6 my-2 ",
                              selectedTag === tag &&
                                "bg-selected text-primary font-semibold",
                              tag === "All" &&
                                "text-primary hover:border-2 hover:border-blue-500",
                              tag === "Notes" &&
                                "text-notes-color border-notes-strong bg-notes-pastel hover:border-2",
                              tag === "Now" &&
                                "text-now-color border-now-strong bg-now-pastel hover:border-2",
                              tag === "Research" &&
                                "text-research-color border-research-strong bg-research-pastel hover:border-2",
                              tag === "Snippets" &&
                                "text-snippets-color border-snippets-strong bg-snippets-pastel hover:border-2"
                            )}
                            onClick={() => {
                              setSelectedTag(tag);
                              setCurrentPage(1);
                              setMenuOpen(!menuOpen);
                            }}
                          >
                            <span
                              className={selectedTag === tag ? "font-bold" : ""}
                            >
                              {tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Tablet and Desktop Nav */}
                    <div className="hidden  justify-between items-center gap-1">
                      {tags.map((tag, i) => (
                        <button
                          className={clsx(
                            "h-8 flex items-center px-1 pl-3 rounded-full cursor-pointer border text-sm transition-colors hover:border-2  ",
                            selectedTag === tag &&
                              "bg-selected text-primary font-semibold",
                            tag === "All" &&
                              "text-primary hover:border-2 hover:border-blue-500  ",
                            tag === "Notes" &&
                              "text-notes-color border-notes-strong bg-notes-pastel hover:border-2  ",
                            tag === "Now" &&
                              "text-now-color border-now-strong bg-now-pastel hover:border-2  ",
                            tag === "Research" &&
                              "text-research-color border-research-strong bg-research-pastel hover:border-2  ",
                            tag === "Snippets" &&
                              "text-snippets-color border-snippets-strong bg-snippets-pastel hover:border-2  "
                          )}
                          key={tag}
                          onClick={() => {
                            setSelectedTag(tag);
                            setCurrentPage(1);
                          }}
                        >
                          <span
                            className={`${selectedTag === tag && "font-bold"}`}
                          >
                            {tag}
                          </span>

                          {/* Show only the count for this specific tag */}
                          <span
                            className={`ml-2 text-xs border rounded-md h-6 min-w-6 font-medium flex items-center justify-center border-border dark:border-border ${selectedTag === tag && "text-blue  font-bold"}`}
                          >
                            {numberPostsPerTag[tag]}
                          </span>
                        </button>
                      ))}
                    </div>

                    <PostFilter
                      searchQuery={searchQuery}
                      onSearchChange={(query) => {
                        setSearchQuery(query);
                        setCurrentPage(1);
                      }}
                    ></PostFilter>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>{" "}
          </>
          <AnimatePresence mode="wait">
            <motion.div className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3  justify-items-center grid-flow-row mt-8">
              {availableFilteredPosts.length === 0 && selectedTag.length > 0 ? (
                <div className="col-span-full flex items-center justify-center min-h-[50vh]">
                  <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
                    <img
                      src="/images/general/no-posts.png"
                      className="animate-pulse duration-300 ease-in-out "
                    />
                    <p className="text-lg text-gray-500 max-w-[40ch]">
                      <b>Post doesn't exist.</b>
                      <br />
                      Please check out all the available posts or search a valid
                      post.
                    </p>
                  </div>
                </div>
              ) : (
                availableFilteredPosts.map((post) => (
                  <motion.div key={post.slug} layout>
                    <PostCard post={post} key={post.slug} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            ></Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPage;

/*
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  //get json data
  const json: StrapiResponse<StrapiPost> = await res.json();

  //construct our own post array
  const posts = json.data.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  //gets all the json objects in that file and returns it
  return { posts };
}
*/
