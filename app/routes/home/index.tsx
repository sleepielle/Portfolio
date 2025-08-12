import Hero from "~/components/Hero";
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Projects } from "~/types";
import AboutPreview from "~/components/AboutPreview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mercedes Paz" },
    { name: "description", content: "My personal website" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const json = await res.json();

  const projects = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  return { projects };
}

// The data from the loader is accessed by passing it to the component as props
const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData;
  //loaders should go into the main page
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  );
};
export default HomePage;
