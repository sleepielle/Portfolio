import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className=" h-10 border border-t-gray-300 ">
      <div className="flex justify-center items-center gap-5 pt-3">
        <Link to={"https://github.com/sleepielle"}>GitHub</Link>
        <Link to={"https://www.linkedin.com/in/mercedesgpaz/"}>LinkedIn</Link>
      </div>
    </footer>
  );
};

export default Footer;
