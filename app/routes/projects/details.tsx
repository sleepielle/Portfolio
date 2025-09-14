import type { Route } from "./+types/details";
import type { Projects } from "~/types";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

export async function loader({ request, params }: Route.LoaderArgs) {
  // Use the request URL to construct absolute URLs for fetch
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  // Load projects from local JSON file using absolute URL
  const projectsResponse = await fetch(`${baseUrl}/projects.json`);
  const projectsData = await projectsResponse.json();

  const item = projectsData.data[0];
  const project: Projects = {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    liveSite: item.liveSite,
    github: item.github,
    date: item.date,
    category: item.category,
    featured: item.featured,
  };
  return { project };
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;

  return (
    <>
      <Link
        to={"/projects"}
        className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" />
        Back to Projects
      </Link>

      <div className="grid gap-8 md:grid-cols-2 items-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-lg shadow-md"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-4">
          {project.title}
        </h1>

        <p className="text-gray-300 text-sm mb-4">
          {new Date(project.date).toLocaleDateString()} • {project.category}
        </p>

        <p className="text-gray-200 mb-6">{project.description}</p>

        <a
          href={project.liveSite}
          target="_blank"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
        >
          View Live Site →
        </a>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
