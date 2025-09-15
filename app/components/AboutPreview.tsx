import { Link } from "react-router";
import Eyebrow from "./Eyebrow";

const AboutPreview = () => {
  return (
    <section className="mt-12 p-10 flex items-center flex-col gap-8">
      <Eyebrow
        title="About Me"
        eyebrowText="Let's connect!"
        description="I'm Mercedes - A passionate web developer and content creator who loves building friendly digital experiences and."
        className={""}
        route="contact"
      />
      <img
        src="/images/profile.jpeg"
        alt="profile"
        className="w-40 h-40 rounded-full object-cover border-2 border-[#e4ff3b] shadow-xl"
      />
      <div className="text-center mx-auto ">
        <p className="text-gray-200.mb-4.max-w-4xl"></p>

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
