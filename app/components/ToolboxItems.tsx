import React from "react";
import { twMerge } from "tailwind-merge";

function ToolboxItems({
  items,
  className,
  itemsWrapperClassName,
}: {
  items: { title: string }[];
  className?: string;
  itemsWrapperClassName?: string;
}) {
  const repeatedItems = [...items, ...items];
  return (
    <div
      className={twMerge(
        "relative overflow-hidden w-full  [mask-image:linear-gradient(to_right,black_10%,black_90%,transparent)] ",
        className
      )}
    >
      <div
        className={twMerge(
          "flex flex-none py-0.5 gap-6 pr-6 w-max ",
          itemsWrapperClassName
        )}
      >
        {repeatedItems.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="inline-flex items-center gap-4 py-2 px-3 border-2 border-gray-100 rounded-lg bg-white/70 "
          >
            <span className="font-semibold ">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolboxItems;
