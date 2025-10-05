import { MagicCard } from "../../components/magicui/magic-card";
import type { Projects } from "~/types";
import { Link, NavLink } from "react-router";
import { RainbowButton } from "components/magicui/rainbow-button";
import { PROJECTS_CARD_GRADIENTS } from "~/lib/constants";

type ProjectCardProps = {
  project: Projects;
  className?: string;
};

const ProjectCard = (props: ProjectCardProps) => {
  const { project, className } = props;

  return (
    <MagicCard
      className="rounded-lg overflow-hidden transition hover:shadow-md sm:h-[27rem] h-max sm:gap-5 "
      gradientFrom={
        PROJECTS_CARD_GRADIENTS[project.category]?.from ?? "#ffffff"
      }
      gradientTo={PROJECTS_CARD_GRADIENTS[project.category]?.to ?? "#ffffff"}
      gradientColor={
        PROJECTS_CARD_GRADIENTS[project.category]?.color ?? "#000000"
      }
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-42 object-cover "
      />
      <div className="flex flex-col m-5 gap-3 ">
        <div className="flex justify-between items-center md:mb-3 flex-col-reverse ">
          <h3 className="text-xl font-semibold mb-1 text-gray-600">
            {project.title}
          </h3>
          <span className="text-sm px-5 py-1 text-gray-400">
            {project.category}
          </span>
        </div>

        <p className="text-sm text-gray-500  h-fit md:h-20 text-center mb-5 sm:mb-0 ">
          {project.description}
        </p>

        <div className="flex flex-row align-center gap-2 justify-center  ">
          <Link to={project.liveSite}>
            <RainbowButton
              variant={"outline"}
              className={`flex-1  ${className}`}
            >
              Live Site
            </RainbowButton>
          </Link>
          <Link to={`/projects/${project.id}`}>
            <RainbowButton
              variant={"outline"}
              className={`flex-2  ${className}`}
            >
              Case Study
            </RainbowButton>
          </Link>
          <Link to={project.github}>
            <RainbowButton
              variant={"outline"}
              className={`flex-1 ${className}`}
            >
              Code
            </RainbowButton>
          </Link>
        </div>
      </div>
    </MagicCard>
  );
};

export default ProjectCard;
