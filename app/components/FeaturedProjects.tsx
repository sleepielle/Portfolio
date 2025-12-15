import type { Route } from "../+types/root";
import type { Projects } from "~/types";
import ProjectCard from "./ProjectCard";
import Eyebrow from "./Eyebrow";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import FeaturedProjectCard from "./FeaturedProjectCard";
import { AnimatePresence, motion } from "framer-motion";
type FeaturedProjectsProps = {
  projects: Projects[];
  count: number;
};

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectsProps) => {
  return (
    <section className="relative ">
      <AnimatePresence>
        <motion.div
          key="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className=""
        >
          <Eyebrow
            title="Featured Projects"
            eyebrowText="See all my projects"
            description="A selection of websites I've built to learn, grow, and create value. Check out the Case Studies to see engineering tools like documentation, user stories, etc."
            className="mt-5 mb-10"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative">
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
