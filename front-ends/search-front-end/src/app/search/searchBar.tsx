import { Dispatch, SetStateAction, useState } from "react";
import { MatterArticle, NarrowedArticle } from "./utils/types";
import { simpleSearch } from "./utils/search";

type SearchBarParams = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

export const SearchBar: React.FC<SearchBarParams> = ({
  searchTerm,
  setSearchTerm,
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
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};
