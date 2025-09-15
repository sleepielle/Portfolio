import { Link } from "react-router";
import Eyebrow from "./Eyebrow";

const AboutPreview = () => {
  return (
    <section className="mt-12 p-10 flex items-center flex-col gap-8">
      <Eyebrow
        title="About Me"
        eyebrowText="Let's connect!"
        description="I'm passionate about software quality while still maintaining connections with the users and clients."
        className={""}
        route="contact"
      />
      <img
        src="/images/profile.jpeg"
        alt="profile"
        className="w-40 h-40 rounded-full object-cover border-2 border-[#e4ff3b] shadow-xl"
      />
    </section>
  );
};

export default AboutPreview;
