interface EyebrowProps {
  eyebrowText: string;
  title: string;
  description: string;
  className: string | null;
}

const Eyebrow = (props: EyebrowProps) => {
  const { eyebrowText, title, description, className } = props;
  return (
    <div
      className={`flex justify-center items-center flex-col gap-2 ${className}`}
    >
      <div className="border border-bg-secondary rounded-2xl px-2 ">
        ⋆˚࿔ {eyebrowText} 𝜗𝜚˚⋆
      </div>
      <h2 className="text-center text-primary text-4xl tracking-tighter">
        {title}
      </h2>
      <p className="text-secondary">{description}</p>
    </div>
  );
};

export default Eyebrow;
