import { MagicCard } from "../../components/magicui/magic-card";
import type { Projects } from "~/types";
import { Link } from "react-router";
import { RainbowButton } from "components/magicui/rainbow-button";

type ProjectCardProps = {
  project: Projects;
  className?: string;
};

const ProjectCard = (props: ProjectCardProps) => {
  const { project, className } = props;

  return (
    <Link
      className=" transform transition duration-300 hover:scale-[1.02]"
      to={`/projects/${project.documentId}`}
    >
      <MagicCard className="card rounded-lg overflow-hidden transition hover:shadow-md h-[25rem] sm:h-max sm:gap-5 ">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-42 object-cover"
        />
        <div className="flex sm:flex-col m-5 gap-3 ">
          <div className="flex justify-between items-center mb-3 sm:flex-col-reverse sm:text-center">
            <h3 className="text-xl font-semibold text-accent mb-1">
              {project.title}
            </h3>
            <span className="text-sm px-5 py-1">{project.category}</span>
          </div>

          <p className="text-sm text-gray-500  h-20  ">{project.description}</p>
          {/**  <div className="flex justify-between items-center text-sm text-muted">
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div> */}
          <div className="flex flex-col md:flex-row align-center gap-2">
            <RainbowButton
              variant={"outline"}
              className={`flex-1 ${className}`}
            >
              <Link to={project.liveSite}>Live Site</Link>
            </RainbowButton>
            <RainbowButton
              variant={"outline"}
              className={`flex-2 ${className}`}
            >
              Case Study
            </RainbowButton>
            <RainbowButton
              variant={"outline"}
              className={`flex-1 ${className}`}
            >
              <Link to={project.github}>Code</Link>
            </RainbowButton>
          </div>
        </div>
      </MagicCard>
    </Link>
  );
};

export default ProjectCard;
