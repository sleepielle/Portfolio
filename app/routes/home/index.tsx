import Hero from "~/components/Hero";
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Projects, PostMeta } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPots";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mercedes Paz" },
    { name: "description", content: "My personal website" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[]; posts: PostMeta[] }> {
  // Use the request URL to construct absolute URLs for fetch
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  // Load projects from local JSON file using absolute URL
  const projectsResponse = await fetch(`${baseUrl}/projects.json`);
  const projectsData = await projectsResponse.json();

  // Load posts from local JSON file using absolute URL
  const postsResponse = await fetch(`${baseUrl}/posts-meta.json`);
  const postsData = await postsResponse.json();

  // Process projects data to match the expected Projects type
  const projects: Projects[] = projectsData.data
    .filter((item: any) => item.featured) // Only get featured projects
    .map((item: any) => ({
      id: item.id.toString(),
      documentId: item.documentId,
      title: item.title,
      description: item.description,
      image: item.image?.url || "/images/no-image.png",
      url: item.url,
      date: new Date(item.date),
      category: item.category,
      featured: item.featured,
    }));

  // Process posts data to match the expected PostMeta type
  const posts: PostMeta[] = postsData
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    ) // Sort by date descending
    .map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      body: "", // posts-meta.json doesn't contain body content
      image: item.image || "/images/no-image.png",
      date: item.date,
    }));

  return { projects, posts };
}

// The data from the loader is accessed by passing it to the component as props
const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;
  //loaders should go into the main page
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <LatestPosts posts={posts} />
      <AboutPreview />
    </>
  );
};
export default HomePage;
