import type { Route } from "../+types/root";
import type { Projects } from "~/types";
import ProjectCard from "./ProjectCard";
import Eyebrow from "./Eyebrow";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import FeaturedProjectCard from "./FeaturedProjectCard";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
type FeaturedProjectsProps = {
  projects: Projects[];
  count: number;
};

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectsProps) => {
  const controls = useAnimation();
  return (
    <AnimatePresence>
      <motion.div
        key="featured-projects-home"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        onViewportEnter={() => {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          });
        }}
        onViewportLeave={() => {
          controls.start({
            opacity: 0.9,
            y: 1,
            transition: { duration: 0.25, ease: "easeOut" },
          });
        }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative"
      >
        <Eyebrow
          title="Featured Projects"
          eyebrowText="See all my projects"
          description="A selection of websites I've built to learn, grow, and create value. Check out the Case Studies to see engineering tools like documentation, user stories, etc."
          className=" mb-10"
        />
        <div className="relative">
          {projects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              projectIndex={index}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeaturedProjects;
