import { Link } from "react-router";

type EyebrowProps = {
  eyebrowText: string;
  title: string;
  description: string;
  className: string | null;
};

const Eyebrow = (props: EyebrowProps) => {
  const { eyebrowText, title, description, className } = props;
  return (
    <div
      className={`relative z-10 flex justify-center items-center flex-col gap-4  ${className}`}
    >
      <h2 className="text-center text-primary text-4xl tracking-tighter">
        {title}
      </h2>{" "}
      <p className="text-gray-500 text-center max-w-[45ch]">{description}</p>
    </div>
  );
};

export default Eyebrow;
