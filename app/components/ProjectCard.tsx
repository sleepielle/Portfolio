import { MagicCard } from "./ui/magic-card";
import type { Projects } from "~/types";
import { Link } from "react-router";
import { RainbowButton } from "./ui/rainbow-button";

type ProjectCardProps = {
  project: Projects;
  className?: string;
};

const ProjectCard = (props: ProjectCardProps) => {
  const { project, className } = props;

  return (
    <MagicCard className="rounded-lg overflow-hidden transition hover:shadow-md sm:h-[28rem] h-max sm:gap-5 ">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-42 object-cover "
      />
      {project.inProgress ? (
        <div className="h-6 w-full text-sm text-center bg-gradient-to-r from-yellow-200 via-[#bee5a4] via-[#c0e5a1]   via-[#56e2f7]  to-[#99dafe] text-white text-border border-amber-400 text-semibold ">
          ── .✦ In Progress ✦── .
        </div>
      ) : (
        <div className="h-5 bg-white"></div>
      )}
      <div className="flex flex-col m-5 gap-3 ">
        <div className="flex justify-between items-center  flex-col-reverse ">
          <h3 className="text-xl font-semibold mb-1 text-gray-600">
            {project.title}
          </h3>
          <span className="text-sm px-5 py-1 text-gray-400">
            {project.category}
          </span>
        </div>

        <p className="text-sm text-gray-500  h-fit md:h-20 text-center mb-3 ">
          {project.description}
        </p>

        <div className="flex flex-row align-center gap-2 justify-center  ">
          <Link to={project.liveSite}>
            <RainbowButton
              variant={"outline"}
              className={`flex-1 hover: ${className}`}
            >
              Live Site
            </RainbowButton>
          </Link>
          <Link to={`/projects/${project.slug}`}>
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
