import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Projects } from "~/types";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects " },
    { name: "description", content: "My personal website" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Projects[] }> {
  // Load projects from local JSON file
  const projectsData = await import("~/data/projects.json");

  const projects = projectsData.data.map((item: any) => ({
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

  return { projects };
}

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
    <section className="bg-primary text-primary min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
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
              className={`px-3 py-1 rounded text-sm cursor-pointer transition-colors ${
                selectedCategory === category
                  ? "bg-accent text-white"
                  : "bg-tertiary text-secondary hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
};

// Export the component as the default export
export default ProjectsPage;
