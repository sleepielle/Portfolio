import { Briefcase, Database, FileText, GitBranch } from "lucide-react";
import Eyebrow from "./Eyebrow";
import { AnimatedBeamDemo } from "./AnimatedBeam";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import { RainbowButton } from "./ui/rainbow-button";

const experiences = [
  {
    role: "Software Developer Intern",
    company: "Escuela Internacional Sampedrana",
    date: "July 2024 – December 2024",
    highlights: [
      {
        icon: <Database className="w-4 h-4 text-blue-500" />,
        text: "Developed 15 full-stack modules with CRUD operations, integrating SAP database systems.",
      },
      {
        icon: <Briefcase className="w-4 h-4 text-green-500" />,
        text: "Proactively identified and resolved database code smells (e.g., bloaters, dead code) to improve maintainability.",
      },
      {
        icon: <FileText className="w-4 h-4 text-purple-500" />,
        text: "Implemented 'docs as code' strategy, creating the first structured internal knowledge base and wiki (50% of modules covered).",
      },
      {
        icon: <GitBranch className="w-4 h-4 text-orange-500" />,
        text: "Authored a GitHub Best Practices wiki to standardize collaboration, code hygiene, and version control.",
      },
    ],
  },
];

export default function ExperiencePreview() {
  return (
    <section className="relative z-10 pt-44 pb-16">
      <Eyebrow
        title="Beyond the Code"
        eyebrowText="View more details"
        description="I focus on delivering full-stack solutions, bridging business-critical systems with modern development practices. "
        className="mt-5 mb-10"
      />
      <div className="flex flex-col justify-center items-start gap-10 sm:flex-row ">
        <div className=" flex gap-6 flex-col items-center justify-center sm:justify-start sm:items-start sm:w-lg mx-auto ">
          <h2 className="text-gray-500 text-2xl text-center sm:text-start max-w-[30ch]">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velitasdf
          </h2>
          <p className="text-gray-400 text-center sm:text-start max-w-[30ch] sm:max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque nec tortor ac ante ultrices pellentesque.
          </p>

          <p className="text-gray-400 text-center sm:text-start max-w-[30ch] sm:max-w-2xl">
            Morbi gravida sem vel ex convallis, id hendrerit massa pretium.
            Praesent non leo nec elit tincidunt eleifend vel et massa.
          </p>

          <div className="flex gap-2 justify-center items-center sm:items-start">
            <RainbowButton
              variant={"outline"}
              className={`${GRADIENT_BUTTON_CLASSNAME}`}
            >
              View Experience
            </RainbowButton>
            <RainbowButton variant={"outline"}>View Projects</RainbowButton>
          </div>
        </div>
        <div className=" sm:w-md w-full mx-auto">
          <div className="h-fit w-full relative">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `
        linear-gradient(to right, #8993a8 1px, transparent 1px),
        linear-gradient(to bottom, #8993a8 1px, transparent 1px)
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
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
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
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
            <AnimatedBeamDemo />
          </div>
        </div>
      </div>{" "}
      {/* <div className="flex gap-16">
            <div className="flex gap-2 items-center ">
              <div className="border-2 rounded-2xl p-3 w-fit">🌸</div>
              <div className="flex flex-col ">
                <p className="text-gray-600">Title</p>
                <p className="text-gray-500 text-sm">Description</p>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <div className="border-2 rounded-2xl p-3 w-fit">🌸</div>
              <div className="flex flex-col ">
                <p className="text-gray-600">Title</p>
                <p className="text-gray-500 text-sm">Description</p>
              </div>
            </div>
          </div> */}
    </section>
  );
}
