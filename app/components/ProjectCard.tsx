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
        className="w-full h-42 object-cover  object-[70%_15%]"
      />
      {project.inProgress ? (
        <div className="h-6 w-full text-sm text-center bg-gradient-to-r from-yellow-200 via-[#bee5a4] via-[#c0e5a1]   via-[#56e2f7]  to-[#99dafe] text-white  border-amber-400 text-semibold ">
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

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          {!project.hideLiveSite && project.liveSite && (
            <a
              href={project.liveSite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <RainbowButton variant="outline" className="w-full">
                Live Site
              </RainbowButton>
            </a>
          )}

          {!project.hideCaseStudy && (
            <Link to={`/projects/${project.slug}`} className="flex-1">
              <RainbowButton variant="outline" className="w-full">
                Case Study
              </RainbowButton>
            </Link>
          )}

          {!project.hideCode && project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <RainbowButton variant="outline" className="w-full">
                Code
              </RainbowButton>
            </a>
          )}
        </div>
      </div>
    </MagicCard>
  );
};

export default ProjectCard;
