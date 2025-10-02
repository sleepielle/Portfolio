import type { Route } from "../+types/root";
import type { Projects } from "~/types";
import ProjectCard from "./ProjectCard";
import Eyebrow from "./Eyebrow";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
type FeaturedProjectsProps = {
  projects: Projects[];
  count: number;
};

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectsProps) => {
  if (projects.length === 0) return null;
  console.log(projects);
  return (
    <section className="pb-15 pt-10 -z-100">
      <Eyebrow
        title="Featured Projects"
        eyebrowText="See all my projects"
        description="A selection of websites I've built to learn, grow, and create value. Check out the Case Studies to see engineering tools like documentation, user stories, etc."
        className="mt-5 mb-10"
        route="projects"
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className={`${GRADIENT_BUTTON_CLASSNAME}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
