import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Projects, StrapiProject, StrapiResponse } from "~/types";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";
/**
 * Loader function - runs on the server before the component renders
 * This function fetches project data from the API and makes it available to the component
 *
 * @param request - The incoming request object (provided by React Router)
 * @returns Promise containing the projects data
 */

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects " },
    { name: "description", content: "My personal website" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[] }> {
  /* EXAMPLE OBJECT FROM API 
    0	
    id	2
    documentId	"j07g2jwn05wvjvmymbgt1cg6"
    createdAt	"2025-08-11T22:44:53.754Z"
    updatedAt	"2025-08-11T22:44:53.754Z"
    publishedAt	"2025-08-11T22:44:55.173Z"
    title	"DevDash"
    description	"A productivity dashboard for developers to track tasks, goals, and inspiration."
    url	"https://example.com"
    date	"2025-08-11"
    category	"full-stack"
    featured	false
    image	
    id	1
    documentId	"oea5qqfcdf4vdh9krivv0a7x"
    name	"project-1.png"
    alternativeText	null
    caption	null
    width	1080
    height	720
    formats
  */

  // Fetch projects data from the local API endpoint
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );
  // Parse the JSON response into JavaScript data
  const json: StrapiResponse<StrapiProject> = await res.json();

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
  // Return the projects data in the format expected by the component
  return { projects };
}

/**
 * ProjectsPage Component
 * Displays a list of projects fetched by the loader
 *
 * @param loaderData - Data returned from the loader function
 */
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  // Extract projects from the loader data with proper TypeScript typing
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const { projects } = loaderData as { projects: Projects[] };

  //get unique categories - use a set bc it has unique values
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  //Filter projects based on the categories
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((projects) => projects.category === selectedCategory);

  //Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  //Get current page's projects, index of first page and last page
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Projects
      </h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard key={project.id} project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

// Export the component as the default export
export default ProjectsPage;
