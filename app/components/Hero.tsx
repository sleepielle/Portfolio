import { Link } from "react-router";

const Hero = ({
  name = "Mercedes",
  text = " I build friendly web experiences and help others become confident, modern developers.",
}) => {
  return (
    <header className="text-center py-20 px-4 bg-secondary text-primary">
      <h2 className="text-4xl font-bold mb-4">Hey, I'm {name} 👋</h2>
      <p className="text-lg text-secondary max-w-2xl mx-auto mb-6">{text}</p>
      <div className="flex justify-center gap-4">
        <Link
          to="/projects"
          className="bg-accent text-white px-6 py-2 rounded hover:bg-accent-hover transition"
        >
          View Projects
        </Link>
        <Link
          to="/contact"
          className="border border-accent text-accent px-6 py-2 rounded hover:bg-accent hover:text-white transition"
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
};

export default Hero;
