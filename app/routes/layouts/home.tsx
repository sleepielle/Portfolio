import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";

const HomeLayout = () => {
  return (
    <>
      <Hero />
      <section className="max-w-6xl mx-auto px-6 my-8">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default HomeLayout;
