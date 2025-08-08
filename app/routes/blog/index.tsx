import type { Route } from "./+types/index";
import { Link } from "react-router";

export async function loader({ request }: Route.LoaderArgs): Promise<any> {
  const url = new URL("/posts-meta.json");
}

const BlogPage = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        👩‍💻 Blog Page
      </h2>
    </>
  );
};

export default BlogPage;
