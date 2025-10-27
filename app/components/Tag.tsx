const Tag = ({ title }: { title: string }) => {
  return (
    <div
      className="w-fit inline-flex border bg-white border-gray-300 mx-3 text-gray-500 px-3 py-1 rounded-full  items-center 
               shadow-xs hover:shadow-sm  hover:text-blue-400 hover:border-blue-400 
               transition-all duration-500 ease-in-out cursor-pointer"
    >
      <span className="text-sm mx-auto transition-transform duration-300">
        &#10038;
      </span>
      <span className="font-semibold mx-auto">{title}</span>
    </div>
  );
};

export default Tag;
