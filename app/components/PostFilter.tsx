type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search posts ..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-1 rounded-lg  text-gray-500 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

export default PostFilter;
