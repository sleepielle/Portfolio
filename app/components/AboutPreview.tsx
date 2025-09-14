import { Link } from "react-router";
import Eyebrow from "./Eyebrow";

const AboutPreview = () => {
  return (
    <section className="mt-12 p-10 flex items-center flex-col gap-8">
      <Eyebrow
        title="About Me"
        eyebrowText="Get to know me"
        description="kad;flk"
        className={"mb-10"}
      />
      <img
        src="/images/no-image.png"
        alt="profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
      />
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">👋 About Me</h2>
        <p className="text-gray-200.mb-4.max-w-4xl">
          I'm Mercedes - A passionate web developer and content creator who
          loves building friendly digital experiences and helping others grow
          into confident, modern developers.
        </p>

        <Link
          to={"/about"}
          className="inline-block text-blue-400 hover:underline text-sm"
        >
          Learn more about me{" "}
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
