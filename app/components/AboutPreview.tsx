import { Link } from "react-router";
import Eyebrow from "./Eyebrow";
import { FAQ } from "./FAQ";
import { DigitalGarden } from "./DigitalGarden";

const AboutPreview = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <div className="flex justify-center items-center flex-col gap-4">
        <h2 className="text-center text-primary text-4xl tracking-tighter">
          About Me
        </h2>

        <p className="text-gray-500 text-center max-w-[45ch]">
          I'm passionate about software quality while still maintaining
          connections with the users and clients.
        </p>
      </div>
      <img
        src="/images/profile.jpeg"
        alt="profile"
        className="w-40 h-40 rounded-full object-cover border-2 border-[#e4ff3b] shadow-xl mt-4"
      />

      <FAQ />
    </div>
  );
};

export default AboutPreview;
