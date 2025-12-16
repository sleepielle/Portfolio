import { NavLink } from "react-router";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { SocialsDock } from "~/components/SocialsDock";

const NotFoundPage = () => {
  return (
    <section className="max-w-5xl min-h-screen mx-auto flex items-center justify-center ">
      <SocialsDock />
      <div className="flex justify-center items-center flex-col gap-2 -top-24 relative ">
        <div className="">
          <img
            src="../../../public/images/general/404.png"
            alt="404"
            className="rounded-4xl h-full w-full animate-move-y duration-300 ease-in-out "
          />
        </div>

        <div className="flex justify-center items-center flex-col gap-2">
          <p className="text-center text-lg text-gray-400 mt-2 ">
            <b>Page not found.</b>
            <br />
            The page you're looking for doesn&apos;t exist, has been removed or
            moved.
          </p>
          <NavLink to="/">
            <RainbowButton variant={"outline"} className="mt-2">
              Go Home
            </RainbowButton>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
