import type { Route } from "../+types/root";
import type { Projects } from "~/types";
import ProjectCard from "./ProjectCard";
import Eyebrow from "./Eyebrow";
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
            className="before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]"
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
