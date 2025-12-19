import { AnimatePresence, motion } from "motion/react";
import Tag from "./Tag";
import { AnimatedList } from "./ui/animated-list";
import { useEffect, useState } from "react";
import type { ExperienceProps } from "~/types";
import { Notification } from "~/components/Notification";
import Eyebrow from "./Eyebrow";

const ExperiencePreview = ({ classname }: { classname: string }) => {
  const [experience, setExperience] = useState<ExperienceProps[]>([]);

  useEffect(() => {
    fetch("../../public/data/experience.json")
      .then((res) => res.json())
      .then((data) => setExperience(data.experience));
  }, []);

  return (
    <div className={classname}>
      <Eyebrow
        title="Experience"
        description="Experience building real-world applications while contributing end-to-end solutions with a focus on quality, usability and maintainability. "
        eyebrowText={""}
        className={null}
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
        flex flex-col gap-10 w-full py-10
        lg:flex-row lg:justify-between
      "
          >
            {/* LEFT COLUMN */}
            <AnimatePresence>
              <motion.div
                key={`experience-${id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full lg:w-1/2 py-4 lg:py-10"
              >
                <h2 className="text-xl sm:text-2xl py-2">{title}</h2>

                <p className="text-sm sm:text-base text-gray-500 italic">
                  {excerpt}
                </p>

                <p className="mt-4 text-sm sm:text-base text-gray-700">
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
    </div>
  );
};

export default ExperiencePreview;
