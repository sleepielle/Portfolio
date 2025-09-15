import { motion } from "framer-motion";
import { Briefcase, Database, FileText, GitBranch } from "lucide-react";
import Eyebrow from "./Eyebrow";
import { MagicCard } from "components/magicui/magic-card";

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
    <section className="py-16">
      <Eyebrow
        title="Experience"
        eyebrowText="View more details"
        description="I focus on delivering full-stack solutions, bridging business-critical systems with modern development practices. "
        className="mt-5 mb-10"
        route="experience"
      />
      <div className="mx-auto flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="card rounded-lg  transition  h-[25rem] sm:h-max sm:gap-5 p-5 border-2 border-[#eefc91] "
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-blue-400">
                {exp.role}
              </h3>
              <span className="text-sm text-gray-500">{exp.date}</span>
            </div>
            <p className="text-gray-400 mb-6">{exp.company}</p>

            <ul className="space-y-3">
              {exp.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1">{item.icon}</div>
                  <p className="text-gray-500">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
