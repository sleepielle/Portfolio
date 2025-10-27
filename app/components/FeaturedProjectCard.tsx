import { MagicCard } from "components/magicui/magic-card";
import { RainbowButton } from "components/magicui/rainbow-button";
import { Link } from "react-router";
import type { ProjectCardProps, Projects } from "~/types";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import { ExternalLink } from "lucide-react";

const FeaturedProjectCard = ({
  project,
  className,
  projectIndex,
}: {
  project: Projects;
  className?: Projects;
  projectIndex: number;
}) => {
  return (
    <div
      className="sticky lg:sticky"
      style={{ top: `calc(100px + ${projectIndex * 150}px)` }}
    >
      <MagicCard
        className="mt-4 px-8 pt-8  rounded-3xl z-0  overflow-hidden after:z-10  after:content-[''] after:absolute after:inset-0 after:outline-2  after:-outline-offset-2 after:rounded-3xl after:outline-white/20  shadow-xs hover:shadow-sm hover:translate-y-1 after:pointer-events-none md:pt-12 md:px-10 lg:pt-16 lg:px-20 "
        gradientColor="#ffffff"
        gradientFrom="#ffffff"
        gradientTo="#ffffff"
      >
        {" "}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
linear-gradient(to right, #e7e5e4 1px, transparent 1px),
linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
`,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
repeating-linear-gradient(
    to right,
    black 0px,
    black 3px,
    transparent 3px,
    transparent 8px
  ),
  repeating-linear-gradient(
    to bottom,
    black 0px,
    black 3px,
    transparent 3px,
    transparent 8px
  ),
  radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
`,
            WebkitMaskImage: `
repeating-linear-gradient(
    to right,
    black 0px,
    black 3px,
    transparent 3px,
    transparent 8px
  ),
  repeating-linear-gradient(
    to bottom,
    black 0px,
    black 3px,
    transparent 3px,
    transparent 8px
  ),
  radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
`,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div>
          <div
            className="absolute inset-0 -z-10 opacity-20"
            style={{ backgroundImage: `url("/images/grain.jpg")` }}
          ></div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:pb-16">
            <div>
              <h3 className="text-2xl mt-2 md:mt-5 text-gray-500 border-b-gray-300 pb-2 border-b-1 ">
                {project.title}
              </h3>
              <p className=" mt-2 text-gray-400">{project.description}</p>

              <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                {project.results &&
                  project.results.map((result) => (
                    <li
                      key={result.title}
                      className="text-gray-400 flex gap-2 "
                    >
                      ✦<span>{result.title}</span>
                    </li>
                  ))}
              </ul>

              <div className="flex gap-2 mt-5">
                {" "}
                <RainbowButton
                  variant="outline"
                  className={`${GRADIENT_BUTTON_CLASSNAME}`}
                >
                  Visit Live Site <ExternalLink />
                </RainbowButton>
                <RainbowButton variant="outline">
                  GitHub Repo
                  <ExternalLink />
                </RainbowButton>{" "}
              </div>
            </div>

            <div className="relative ">
              <img
                src={project.image}
                alt={project.title}
                className="lg:absolute  mt-8 -mb-10 mx-auto md:-mb-0 lg:mt-0 lg:h-[400px] lg:w-auto lg:max-w-none rounded-2xl"
              />
            </div>
          </div>
        </div>
      </MagicCard>
    </div>
  );
};

export default FeaturedProjectCard;
