import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";
import { SocialsDock } from "~/components/SocialsDock";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);
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
    <div className=" mx-auto mt-10 px-6 py-6 ">
      <SocialsDock />
      <h2 className="text-3xl font-semibold text-primary mb-8 text-center tracking-tighter">
        All Posts
      </h2>

      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      ></PostFilter>

      {tags.map((p) => (
        <div className="flex justify-between items-center gap-2">
          <p>{p}</p>
        </div>
      ))}
      <div className=" grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
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
