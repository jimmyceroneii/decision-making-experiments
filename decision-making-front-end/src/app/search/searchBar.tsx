import { NarrowedArticle } from "./utils/types";

type SearchBarParams = {
  searchTerm: string;
  searchFn: (term: string) => NarrowedArticle[];
};

export const SearchBar: React.FC<SearchBarParams> = ({
  searchTerm,
  searchFn,
}: SearchBarParams) => {
  return (
    <div className="relative">
      <input
        style={{ border: "1px solid black" }}
        type="text"
        className="w-full px-4 py-2 rounded-md border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          searchFn(e.target.value);
        }}
      />
    </div>
  );
};
