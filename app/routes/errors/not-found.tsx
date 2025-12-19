import { NavLink } from "react-router";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { SocialsDock } from "~/components/SocialsDock";
import { AnimatePresence, motion } from "framer-motion";
import type { Route } from "./+types/not-found";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 | Page Not Found" },
    { name: "description", content: "Mercedes Paz's Portfolio" },
  ];
}

const NotFoundPage = () => {
  return (
    <section className="max-w-5xl min-h-screen mx-auto flex items-center justify-center ">
      <AnimatePresence>
        <motion.div
          key="not-found"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="group relative rounded-2xl  border border-transparent 
                transition-all duration-300 "
        >
          <div className="flex justify-center items-center flex-col gap-2 -top-24 relative ">
            <div className="">
              <img
                src="/images/general/404.png"
                alt="404"
                className="rounded-4xl h-full w-full animate-move-y duration-300 ease-in-out "
              />
            </div>

            <div className="flex justify-center items-center flex-col gap-2">
              <p className="text-center text-lg text-gray-500 mt-2 ">
                <b>Page not found.</b>
                <br />
                The page you're looking for doesn&apos;t exist, has been removed
                or moved.
              </p>
              <NavLink to="/">
                <RainbowButton variant={"outline"} className="mt-2">
                  Go Home
                </RainbowButton>
              </NavLink>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default NotFoundPage;
