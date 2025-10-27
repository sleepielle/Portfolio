import type { Route } from "../+types/root";
import type { Projects } from "~/types";
import ProjectCard from "./ProjectCard";
import Eyebrow from "./Eyebrow";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import FeaturedProjectCard from "./FeaturedProjectCard";
type FeaturedProjectsProps = {
  projects: Projects[];
  count: number;
};

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectsProps) => {
  if (projects.length === 0) return null;
  console.log(projects);
  return (
    <section className=" ">
      <Eyebrow
        title="Featured Projects"
        eyebrowText="See all my projects"
        description="A selection of websites I've built to learn, grow, and create value. Check out the Case Studies to see engineering tools like documentation, user stories, etc."
        className="mt-5 mb-10"
      />

      <div className="relative ">
        {projects.map((project, index) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            projectIndex={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
