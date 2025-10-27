"use client";

import { MagicCard } from "components/magicui/magic-card";
import { RainbowButton } from "components/magicui/rainbow-button";
import { motion } from "framer-motion";
import { File } from "lucide-react";
import { Link } from "react-router";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import {
  Code,
  Cpu,
  Terminal,
  Database,
  Layout,
  Cloud,
  Github,
  Globe,
} from "lucide-react";

const icons = [
  { Icon: Code, x: "-55%", y: "-10%" },
  { Icon: Cpu, x: "-40%", y: "-60%" },
  { Icon: Database, x: "-45%", y: "25%" },
  { Icon: Layout, x: "50%", y: "-5%" },
  { Icon: Cloud, x: "40%", y: "-60%" },
  { Icon: Github, x: "35%", y: "35%" },
  //   { Icon: Globe, x: "-10%", y: "35%" },
  //   { Icon: Terminal, x: "45%", y: "-78%" },
];

export default function CTASection() {
  return (
    <section className=" py-28 overflow-hidden h-fit">
      {/* Background glow */}

      <MagicCard
        className="rounded-2xl shadow-xs hover:shadow-sm hover:translate-y-1"
        gradientOpacity={0}
      >
        <div className="relative min-h-[50vh] flex flex-col items-center justify-center px-6">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
              backgroundSize: "32px 32px",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
              maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
            }}
          />
          <div className=" max-w-5xl mx-auto text-center px-6 relative z-10 ">
            {/* Subtle entrance animation */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-3xl tracking-tighter text-blue-500"
            >
              Let’s Build Something Impactful
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-gray-500 max-w-2xl mx-auto mb-10 mt-4"
            >
              Whether you need a scalable full-stack solution or a beautiful
              frontend crafted with precision — let’s turn your vision into
              reality.
            </motion.p>

            <div className="absolute inset-0 pointer-events-none">
              {icons.map(({ Icon, x, y }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x})`,
                    top: `calc(50% + ${y})`,
                  }}
                >
                  <div className="p-3 rounded-xl bg-white/60 backdrop-blur-md shadow-md border border-white/30">
                    <Icon className="w-6 h-6 text-blue-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <RainbowButton
                variant={"outline"}
                className={`${GRADIENT_BUTTON_CLASSNAME}`}
              >
                Contact Me
              </RainbowButton>

              <RainbowButton variant={"outline"}>View Projects</RainbowButton>
            </motion.div>

            {/*         
        <div className="relative mt-20 flex justify-center">
          <motion.div
            className="absolute w-56 h-56 bg-gradient-to-tr from-blue-200/60 to-indigo-200/40 rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-72 h-72 bg-gradient-to-br from-blue-100/50 to-green-100/50 rounded-full blur-3xl"
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div> */}
          </div>
        </div>
      </MagicCard>
    </section>
  );
}
