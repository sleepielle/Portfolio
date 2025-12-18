import { Link } from "react-router";
import { useState } from "react";
import { GRADIENT_BUTTON_CLASSNAME } from "~/lib/constants";
import { TextAnimate } from "./ui/text-animate";
import { AnimatePresence, motion } from "framer-motion";
import { RainbowButton } from "./ui/rainbow-button";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <div>
      <div className="relative isolate px-6 py-20 lg:px-8">
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#394ffb] to-[#35a3fa] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75 overflow-x-clip"
          />
        </div> */}

        <div className="mx-auto max-w-2xl py-20 mb-10 ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className=""></div>
          </div>

          <TextAnimate
            animation="blurInUp"
            startOnView
            as={"p"}
            className="relative rounded-full px-3 mb-8 text-sm/6 text-gray-600 ring-1 text-center   ring-gray-900/10 hover:ring-gray-900/20 w-fit mx-auto"
          >
            💻 Software Engineer | 🌎 Based in Honduras | 🎨 Creative at heart
          </TextAnimate>

          <div className="text-center">
            <TextAnimate
              animation="blurInUp"
              startOnView
              as={"p"}
              className="text-5xl font-semibold tracking-tight text-balance text-primary text-shadow-gray-500 text-shadow-2xs  sm:text-7xl no-"
            >
              Passionate about software quality and elegant solutions
            </TextAnimate>

            <TextAnimate
              animation="blurInUp"
              startOnView
              as={"p"}
              className="mt-8 text-lg  text-pretty text-gray-600 sm:text-xl/8"
            >
              I'm Mercedes Paz, a Software Engineer specialized on building
              scalable, user-friendly applications with a focus on code quality
              and structured documentation for long-term maintainability.
            </TextAnimate>

            <AnimatePresence>
              <motion.div
                key="home-hero"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <Link to="/projects">
                  <RainbowButton
                    variant="outline"
                    className={`font-semibold ${GRADIENT_BUTTON_CLASSNAME}`}
                  >
                    View Projects
                  </RainbowButton>
                </Link>

                <Link to="/contact">
                  <button className="text-sm font-semibold text-gray-500">
                    Contact Me <span aria-hidden="true">📩</span>
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#e4ff3b] to-[#35a3fa] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div> */}
      </div>
    </div>
  );
}
