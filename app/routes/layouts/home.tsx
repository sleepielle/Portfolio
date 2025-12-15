import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";

const HomeLayout = () => {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
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
        radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
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
        radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
  `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Page Content */}
      <div className="relative z-10 ">
        <Hero />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
