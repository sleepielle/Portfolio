import { X } from "lucide-react";
import { Button } from "./ui/button";

type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
  return (
    <div className="flex gap-2 w-full sm:w-fit">
      <input
        type="text"
        placeholder="Search posts ..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-1 rounded-lg  text-gray-500 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
      />
      {searchQuery && (
        <Button
          variant={"outline"}
          className="border-[#d1d5dc]"
          onClick={(e) => onSearchChange("")}
        >
          <X className="text-gray-500" />
        </Button>
      )}
    </div>
  );
};

export default PostFilter;
