"use client";
import { Link } from "react-router";
import Eyebrow from "./Eyebrow";
import { FAQ } from "./FAQ";
import { DigitalGarden } from "./DigitalGarden";
import CardHeader from "./CardHeader";
import { MagicCard } from "components/magicui/magic-card";
import ToolboxItems from "./ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";

const toolboxItems = [
  { title: "JavaScript" },
  { title: "HTML5" },
  { title: "CSS3" },
  { title: "React" },
  { title: "GitHub" },
];

const hobbies = [
  { title: "Reading", emoji: "📖", left: "10%", top: "5%" },
  { title: "Painting", emoji: "🎨", left: "35%", top: "25%" },
  { title: "Writing", emoji: "📝", left: "4%", top: "30%" },
  { title: "Gaming", emoji: "👾", left: "50%", top: "45%" },
  { title: "Movies", emoji: "🍿", left: "25%", top: "55%" },
];

const AboutPreview = () => {
  const constraintRef = useRef(null);

  return (
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

        <div className="w-full grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
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
              title="Beyond the Code"
              description="Explore my interests and hobbies beyond the digital realm. You can drag the hobbies!"
              classname="px-6 py-6"
            />
            <div className="relative h-[150px] w-full px-4" ref={constraintRef}>
              {hobbies.map((hobby) => (
                <motion.div
                  key={hobby.title}
                  className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-blue-400 to-sky-300 rounded-full py-1.5 absolute"
                  style={{ left: hobby.left, top: hobby.top }}
                  drag
                  dragConstraints={constraintRef}
                >
                  <span className="font-medium text-white">{hobby.title}</span>
                  <span>{hobby.emoji}</span>
                </motion.div>
              ))}{" "}
            </div>
          </MagicCard>

          <MagicCard
            className="h-[320px] relative flex rounded-xl md:col-span-2 lg:col-span-1 w-full shadow-xs **:transition-all duration-500 
             hover:shadow-md hover:-translate-y-1"
          >
            <div className="w-full h-full rounded-2xl">
              <img
                src="/images/honduras-map.png"
                alt="profile"
                className="w-full h-full  rounded-2xl object-cover  border-blue-400 shadow-xl"
              />
              <div className="absolute inset-0 bg-sky-400/30  mix-blend-multiply rounded-2xl"></div>
            </div>

            <div>
              <img
                src="/images/profile.jpeg"
                alt="profile"
                className="z-10 w-40 h-40 rounded-full object-cover border-2 border-blue-400  shadow-xl mt-4 absolute top-14 left-24"
              />
              <div className="w-40 h-40 rounded-full object-cover border-2 border-sky-400 bg-sky-300  blur-2xl shadow-xl mt-4 absolute top-10 left-24" />
            </div>
          </MagicCard>
        </div>
      </div>
    </div>
  );
};

export default AboutPreview;
