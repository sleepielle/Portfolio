import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import ExperiencePreview from "~/components/ExperiencePreview";
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
    fetch("/data/experience.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setExperience(data.experience))
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const controls = useAnimation();

  return (
    <section className="max-w-6xl py-10 ">
      <ExperiencePreview classname={""} />

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
