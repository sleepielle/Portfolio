import { NavLink } from "react-router";
import { RainbowButton } from "../../../components/magicui/rainbow-button";
import { SocialsDock } from "~/components/SocialsDock";

const NotFoundPage = () => {
  return (
    <section className="max-w-5xl h-screen mx-auto px-6 flex items-center justify-center">
      <SocialsDock />
      <div className="flex justify-center items-center flex-col gap-2">
        <svg
          className="font-bold text-6xl w-full h-full mx-auto"
          viewBox="0 0 500 250"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            className="text-[13rem]  [text-anchor:middle] [dominant-baseline:middle] stroke-text"
            x="50%"
            y="50%"
          >
            404
          </text>
        </svg>
        <div className="flex justify-center items-center flex-col gap-2">
          <p className="text-blue-500 font-semibold text-xl">Page Not Found</p>
          <p className="text-center text-lg text-gray-400 ">
            The page you're looking for doesn&apos;t exist or has been moved.
          </p>
          <NavLink to="/">
            <RainbowButton variant={"outline"} className="mt-3">
              Go Home
            </RainbowButton>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
