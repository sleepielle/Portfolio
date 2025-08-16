import Hero from "~/components/Hero";
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Projects, StrapiProject, StrapiResponse } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import type { PostMeta } from "~/types";
import LatestPosts from "~/components/LatestPots";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mercedes Paz" },
    { name: "description", content: "My personal website" },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{
  projects: Projects[];
  posts: PostMeta[];
}> {
  const url = new URL(request.url);
  // when we use a filter, it is gonna come back as an array called data
  const [projectRes, postRes] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`
    ),
    fetch(new URL("/posts-meta.json", url)),
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Error("Failed to fetch projects or posts");
  }

  const postJson = await postRes.json();
  const projectJson: StrapiResponse<StrapiProject> = await projectRes.json();
  // Process the projects data to extract the actual projects array
  const projects = projectJson.data.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image?.url}`
      : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  return { projects, posts: postJson };
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
