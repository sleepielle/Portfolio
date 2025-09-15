import Eyebrow from "./Eyebrow";

const ExperiencePreview = () => {
  return (
    <div className="mb-20 mt-10">
      <Eyebrow
        title="Experience"
        eyebrowText="View more details"
        description=""
        className="mt-5 mb-10"
        route="experience"
      />
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            July 2024 - December 2024
          </time>
          <h3 className="text-lg font-semibold text-primary dark:text-white">
            Software Developer Intern | Escuela Internacional Sampedrana
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <span>
              ✅Developed{" "}
              <span className="font-semibold">15 full-stack modules</span> with
              CRUD operations,{" "}
              <span className="font-semibold">
                integrating SAP database systems
              </span>{" "}
              to support critical business functions.{" "}
            </span>
            <br /> <br />
            <span>
              ✅ Proactively identified and resolved database code smells (e.g.,
              bloaters, dead code) to improve maintainability and performance,
              while documenting best practices for future devs.
            </span>
            <br /> <br />
            <span>
              ✅ Implemented “docs as code” documentation strategy, creating the
              team’s first structured internal knowledge base and a Wiki
              covering 50% of the modules I built.
            </span>
            <br /> <br />
            <span>
              ✅ Authored a GitHub Best Practices wiki to standardize
              collaboration, code hygiene, and version control across the
              department.
            </span>
            <br />
          </p>
        </li>
      </ol>
    </div>
  );
};

export default ExperiencePreview;
