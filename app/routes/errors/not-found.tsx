import { Link } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RainbowButton } from "../../../components/magicui/rainbow-button";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

const NotFoundPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <section className="relative max-w-6xl mx-auto px-6 my-8 border h-screen border-amber-600">
      <motion.div
        className="absolute  flex items-center justify-center text-black text-[64px] leading-[66px] cursor-default"
        style={{
          WebkitMaskImage: "url('/icons/mask.svg')",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
          background: "#358cfc",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          className=" p-10 text-[#e4ff3b] text-center flex items-center  justify-center  text-[64px] leading-[66px] cursor-default border-2 border-amber-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Page Not Found <br />
          The page you're looking for doesn't exist or has been moved.
        </p>
      </motion.div>

      <div className="  flex items-center justify-center text-[#afa18f] text-[64px] leading-[66px] cursor-default border-2 border-amber-300 text-center">
        <p className="w-[1000px] p-10">
          <span className="text-[#3a4efb]">Page Not Found</span>
          <br /> The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div>
        <RainbowButton variant={"outline"}>Get Unlimited Access</RainbowButton>
      </div>
    </section>
  );
};

export default NotFoundPage;
