import { MagicCard } from "~/components/ui/magic-card";
import type { Projects } from "~/types";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import { ExternalLink } from "lucide-react";
import { RainbowButton } from "./ui/rainbow-button";

const FeaturedProjectCard = ({
  project,
  className,
  projectIndex,
}: {
  project: Projects;
  className?: Projects;
  projectIndex: number;
}) => {
  {
    console.log(project.image);
  }

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
        <div className="absolute inset-0 z-0" />
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

            <div className="relative w-[45rem]  ">
              <img
                src={`${project.featuredImage}`}
                alt={project.title}
                className="lg:absolute  mt-8 -mb-10  md:-mb-0 lg:mt-0 lg:h-[400px]  lg:max-w-none rounded-2xl border-blue-300 border-2 w-full object-cover  object-[300%_70%] h-full"
              />
            </div>
          </div>
        </div>
      </MagicCard>
    </div>
  );
};

export default FeaturedProjectCard;
