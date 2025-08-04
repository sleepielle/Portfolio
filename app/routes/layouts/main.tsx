import { Outlet } from "react-router";
import type { Route } from "../home/+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome!" },
    { name: "description", content: "My personal website" },
  ];
}

const MainLayout = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 my-8">
        <Outlet />
      </section>
    </>
  );
};

export default MainLayout;
