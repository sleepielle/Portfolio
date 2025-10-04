import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";
import { SocialsDock } from "~/components/SocialsDock";
import { DigitalGarden } from "~/components/DigitalGarden";
import clsx from "clsx";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("data/posts-meta.json", request.url);
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
  const [selectedTag, setSelectedTag] = useState("");

  const postsPerPage = 6;

  const { posts } = loaderData;

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  //removing duplicate tags
  const tags: string[] = [
    "All",
    ...new Set(currentPosts.flatMap((p) => p.tags)),
  ];

  return (
    <div className=" max-w-7xl mx-auto w-full mt-20 ">
      <SocialsDock />

      <h2 className="text-4xl text-primary  text-center tracking-tighter ">
        Blog
      </h2>
      <p className="text-center text-sm text-gray-400 mb-8 mt-2 max-w-[50ch] mx-auto">
        This is my knowledge lab 🧪 — a mix of code notes, industry research
        paper breakdowns and summaries, what I'm currently learning, among
        others. Take a look around :)
      </p>

      <div className="flex flex-wrap gap-2  justify-between items-center">
        <div className="flex justify-between items-center gap-1">
          {tags.map((tag) => (
            <button
              className={clsx(
                "h-8 flex items-center px-1 pl-3 rounded-lg cursor-pointer border text-sm transition-colors",
                // selected styling (use a named color from tailwind config)
                selectedTag === tag && "bg-selected text-primary font-semibold",
                // notes styling (literal classes so Tailwind includes them)
                tag === "Notes" &&
                  "text-notes-color  border-notes-strong bg-notes-pastel ",

                tag === "Now" &&
                  "text-now-color  border-now-strong bg-now-pastel ",

                tag === "Research" &&
                  "text-research-color  border-research-strong bg-research-pastel ",

                tag === "Snippets" &&
                  "text-snippets-color  border-snippets-strong bg-snippets-pastel "
              )}
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                setCurrentPage(1);
              }}
            >
              <span className={` ${selectedTag === tag && "text-white"}`}>
                {tag}
              </span>
              <span
                className={`ml-2 text-xs border rounded-md h-6 min-w-6 font-medium flex items-center justify-center border-border dark:border-border  ${selectedTag && "text-blue bg-white font-bold"}`}
              >
                5
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

      <div> </div>
      <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3  justify-items-center grid-flow-row mt-8">
        {currentPosts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts found</p>
        ) : (
          currentPosts.map((post) => <PostCard post={post} key={post.slug} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        ></Pagination>
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
