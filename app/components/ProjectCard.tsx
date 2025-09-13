import { MagicCard } from "../../components/magicui/magic-card";
import type { Projects } from "~/types";
import { Link } from "react-router";

const ProjectCard = ({ project }: { project: Projects }) => {
  return (
    <Link
      className="block transform transition duration-300 hover:scale-[1.02]"
      to={`/projects/${project.documentId}`}
    >
      <MagicCard className="card rounded-lg overflow-hidden transition hover:shadow-md">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-5">
          <h3 className="text-3xl font-semibold text-accent mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-secondary mb-2">{project.description}</p>
          <div className="flex justify-between items-center text-sm text-muted">
            <span>{project.category}</span>
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
};

export default ProjectCard;
