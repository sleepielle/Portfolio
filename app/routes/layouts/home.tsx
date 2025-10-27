import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";

const HomeLayout = () => {
  return (
    <div className="relative min-h-screen w-full ">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%,#ffffff 40%,#f1f7fe 95%)",
        }}
      />
      {/* Page Content */}
      <div className="relative z-10 ">
        <Hero />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
