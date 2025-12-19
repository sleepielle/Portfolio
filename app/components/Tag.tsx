import { cn } from "~/lib/utils";

const Tag = ({ title, classname }: { title: string; classname: string }) => {
  return (
    <div
      className={cn(
        "w-fit inline-flex border  px-3 py-1 rounded-full  items-center shadow-xs hover:shadow-sm   transition-all duration-500 ease-in-out cursor-pointer",
        classname
      )}
    >
      <span className="text-sm mx-auto transition-transform duration-300">
        &#10038;
      </span>
      <span className="font-semibold mx-auto">{title}</span>
    </div>
  );
};

export default Tag;
