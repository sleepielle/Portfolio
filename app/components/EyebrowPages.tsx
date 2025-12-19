const EyebrowPages = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h2 className="text-4xl text-primary mb-8 text-center tracking-tighter">
        {title}{" "}
      </h2>
      <p className="text-center  text-gray-500 mb-8 mt-1 max-w-[50ch] mx-auto text-base">
        {description}
      </p>
    </>
  );
};

export default EyebrowPages;
