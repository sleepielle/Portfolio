"use client";
import CardHeader from "./CardHeader";
import { MagicCard } from "~/components/ui/magic-card";
import ToolboxItems from "./ToolboxItems";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useRef } from "react";

const toolboxItems = [
  { title: "JavaScript" },
  { title: "HTML5" },
  { title: "Motion" },
  { title: ".NET" },
  { title: "UI/UX" },
  { title: "CSS3" },
  { title: "React" },
  { title: "GitHub" },
];

const hobbies = [
  { title: "Reading", emoji: "📖", left: "10%", top: "5%" },
  { title: "Painting", emoji: "🎨", left: "55%", top: "55%" },
  { title: "Scrapbooking", emoji: "🎨", left: "5%", top: "65%" },
  { title: "Nature", emoji: "🌲", left: "25%", top: "75%" },
  { title: "Writing", emoji: "📝", left: "60%", top: "30%" },
  { title: "Dying Light", emoji: "🧟", left: "70%", top: "45%" },
  { title: "Studio Ghibli Movies", emoji: "🌺", left: "25%", top: "55%" },
  { title: "Retro Games", emoji: "⭐", left: "80%", top: "35%" },
];

const AboutPreview = () => {
  const constraintRef = useRef(null);
  const controls = useAnimation();
  return (
    <motion.div
      key="about-preview"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      onViewportEnter={() => {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeInOut" },
        });
      }}
      onViewportLeave={() => {
        controls.start({
          opacity: 0.9,
          y: 1,
          transition: { duration: 0.25, ease: "easeOut" },
        });
      }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="group relative rounded-2xl  border border-transparent 
                transition-all duration-300 "
    >
      <div className="flex flex-col justify-center items-center py-20">
        <div className="flex justify-center items-center flex-col gap-4">
          <h2 className="text-center text-primary text-4xl tracking-tighter">
            About Me
          </h2>

          <p className="text-gray-500 text-center max-w-[45ch]">
            I'm passionate about software quality while still maintaining
            connections with the users and clients.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3 ">
            <MagicCard
              className="relative h-[320px] md:col-span-2 lg:col-span-1 
             overflow-hidden rounded-2xl 
             shadow-xs **:transition-all duration-500 
             hover:shadow-md hover:-translate-y-1"
            >
              {/* Background grid pattern */}
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
              <CardHeader
                title="My Reads"
                description=" Explore the books shaping my perspectives"
              />

              <div className="w-40 mx-auto mt-2 md:mt-0 ">
                <img src={"/images/book-cover.png"} alt="book cover" />
              </div>
            </MagicCard>

            <MagicCard
              className="h-[320px] md:col-span-3 lg:col-span-2 rounded-xl
             relative overflow-hidden
             bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_100%)]  bg-white/10 backdrop-blur-md  shadow-xs **:transition-all duration-500 
             hover:shadow-md hover:-translate-y-1

             "
            >
              {/* Pattern overlay */}
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
                <CardHeader
                  title="My Toolbox"
                  description="Explore the technologies and tools I use to craft exceptional
                  digital experiences"
                />
              </div>

              <ToolboxItems
                items={toolboxItems}
                itemsWrapperClassName="animate-move-left [animation-duration:15s]"
              />
              <ToolboxItems
                items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-right  [animation-duration:15s]"
              />
            </MagicCard>
          </div>

          <div className="w-full grid grid-cols-1 gap-8">
            <MagicCard
              className="h-[320px] flex flex-col rounded-xl md:col-span-3 lg:col-span-2 w-full  shadow-xs **:transition-all duration-500 
             hover:shadow-md hover:-translate-y-1"
            >
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
              <CardHeader
                title="Things I Like"
                description="Explore my interests and hobbies beyond the digital realm. You can drag the hobbies!"
                classname="px-6 py-6"
              />
              <div
                className="relative h-[150px] w-full p-20"
                ref={constraintRef}
              >
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-blue-400 to-sky-300 rounded-full py-1.5 absolute"
                    style={{ left: hobby.left, top: hobby.top }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-white">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}{" "}
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPreview;
