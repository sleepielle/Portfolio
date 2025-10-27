import IconWrapper from "./IconWrapper";
import { twMerge } from "tailwind-merge";

function CardHeader({
  title,
  description,
  classname,
}: {
  title: string;
  description: string;
  classname?: string;
}) {
  return (
    <div className={twMerge("flex flex-col p-6 md:py-8 md:px-10 ", classname)}>
      <div className="inline-flex items-center gap-2 border-b-gray-200 border-b-1 pb-1">
        <span className="text-2xl text-gray-600">✦</span>
        <h3 className=" text-2xl text-gray-600 tracking-tighter ">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
}

export default CardHeader;
