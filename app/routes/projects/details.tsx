import type { Route } from "./+types/details";
import type { Projects } from "~/types";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Projects> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects/${params.id}`
  );
  if (!res.ok) throw new Response("Project not found", { status: 404 });

  const project: Projects = await res.json();
  return project;
}

{
  /*This is doing the same thing as useEffect, but cleaner. 
  
  se está obteniendo los datos desde el client, por que el cliente tiene que seleccionar dinamicamente el projecto que necesita.  

  Esto tambien se puede recuperar con anticipo al servidor desde el momento en el que el usuario selecciona el project, pero esta es una forma de recuperar la informacion desde el cliente.
  */
}

{
  /*El cliente se hidrata, mientras esta cargando la pagina, se muestra esto para que el usuario vea que si se esta cargando la pagina. Aqui se puede agregar un spinner, loading, etc  */
}
export function HydrateFallback() {
  return <div>Loading...</div>;
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const projects = loaderData;

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
          src={projects.image}
          alt={projects.title}
          className="w-full rounded-lg shadow-md"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-4">
          {projects.title}
        </h1>

        <p className="text-gray-300 text-sm mb-4">
          {new Date(projects.date).toLocaleDateString()} • {projects.category}
        </p>

        <p className="text-gray-200 mb-6">{projects.description}</p>

        <a
          href={projects.url}
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
