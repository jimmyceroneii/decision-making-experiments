import { Dispatch, SetStateAction, useState } from "react";
import { MatterArticle, NarrowedArticle } from "./utils/types";
import { simpleSearch } from "./utils/search";

type SearchBarParams = {
  articles: MatterArticle[];
  setSearchResults: Dispatch<SetStateAction<NarrowedArticle[]>>;
};

export const SearchBar: React.FC<SearchBarParams> = ({
  articles,
  setSearchResults,
}: SearchBarParams) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchFn = (searchTerm: string): void => {
    setSearchResults(simpleSearch({ searchTerm, list: articles }).slice(0, 9));
  };

  return (
    <div className="relative">
      <input
        style={{ border: "1px solid black" }}
        type="text"
        className="w-full px-4 py-2 rounded-md border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          searchFn(e.target.value);
        }}
      />
    </div>
  );
};
