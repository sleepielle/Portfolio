import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import EyebrowPages from "~/components/EyebrowPages";
import Markdown from "~/components/Markdown";
import { Notification } from "~/components/Notification";
import PDFViewer from "~/components/PDFViever";
import Tag from "~/components/Tag";
import { AnimatedList } from "~/components/ui/animated-list";
import type { ExperienceProps } from "~/types";
const Experience = () => {
  const [experience, setExperience] = useState<ExperienceProps[]>([]);

  useEffect(() => {
    fetch("../../../public/data/experience.json")
      .then((res) => res.json())
      .then((data) => setExperience(data.experience));
  }, []);

  const controls = useAnimation();

  return (
    <section className="max-w-6xl py-10 ">
      <EyebrowPages
        title="Experience"
        description="Experience building real-world applications while contributing end-to-end solutions with a focus on quality, usability and maintainability. "
      />

      {experience.map((project) => {
        const {
          id,
          title,
          excerpt,
          additional,
          description,
          skills,
          "animated-list": animatedList,
        } = project;

        return (
          <div
            key={id}
            className="
        flex flex-col gap-10 w-full mt-10
        lg:flex-row lg:justify-between
      "
          >
            {/* LEFT COLUMN */}
            <AnimatePresence>
              <motion.div
                key="experience-details"
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
                className="w-full lg:w-1/2 py-4 lg:py-10"
              >
                <h2 className="text-xl sm:text-2xl py-2">{title}</h2>

                <p className="text-sm sm:text-base text-gray-500 italic">
                  {excerpt}
                </p>

                <p className="mt-4 text-sm sm:text-base text-gray-500">
                  {description}
                </p>

                {additional && (
                  <span className="block mt-6 text-xs sm:text-sm text-gray-400">
                    {additional}
                  </span>
                )}

                <div className="mt-6 sm:mt-7 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Tag key={skill} title={skill} classname="" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* RIGHT COLUMN — ANIMATED LIST */}
            <div className="w-full lg:flex-1 relative">
              <div
                className="
            flex flex-col overflow-hidden w-full
            h-[420px] sm:h-[500px] lg:h-[600px]
            pt-6 sm:pt-8 lg:pt-10
          "
              >
                <AnimatedList>
                  {animatedList?.map((item, idx) => (
                    <Notification
                      key={idx}
                      name={item.name}
                      description={item.description}
                      icon={item.icon}
                      color={item.color}
                      time={item.time}
                    />
                  ))}
                </AnimatedList>
              </div>

              {/* Fade-out gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent" />
            </div>
          </div>
        );
      })}

      <hr className="p-5" />

      <AnimatePresence>
        <motion.div
          key="experience-pdf"
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
          className="max-w-6xl z-10 "
        >
          <div className=" mx-auto px-4 md:px-0 z-10 text-gray-500  ">
            <div className="text-gray-500">
              <h3 className="text-2xl text-blue-500">
                Intership Detailed Overview
              </h3>
              <p className="text-sm sm:text-base text-gray-500 my-5">
                Below you can examine a detailed overview of my work during my
                time at EIS 💻. This includes{" "}
                <b>
                  how I maximized the tech stack value, how I ensured
                  maintainability and usability as a focus, and how the
                  technical documents were written.{" "}
                </b>
              </p>
            </div>
            <PDFViewer pdfRoute={"/pdf/experience-eis.pdf"} />
          </div>

          <hr className="p-5" />

          <div className=" ">
            <div className=" mx-auto px-4 md:px-0 z-10  mt-20 ">
              <div className="text-gray-500">
                <h3 className="text-2xl text-blue-500">
                  UI/UX Internship Demo
                </h3>
                <p className="text-base text-gray-500 my-5">
                  This section highlights selected UI screens created during my
                  internship ✅. The designs use non-sensitive information and
                  were crafted to{" "}
                  <b>
                    align visually and functionally with an enterprise
                    application
                  </b>
                  of over 50 modules. The WebApp's characterized by a minimal,
                  sleek design.
                </p>
              </div>
              <PDFViewer pdfRoute={"/pdf/ui-internship.pdf"} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Experience;
