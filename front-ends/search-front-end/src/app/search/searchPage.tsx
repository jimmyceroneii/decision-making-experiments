"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./searchBar";
import { MatterArticle, NarrowedArticle } from "./utils/types";
import { fetchLocalMatterArticles } from "./utils/sources";
import { SearchResultContainer } from "./searcResultContainer";

export const SearchPage: React.FC = () => {
  const [articles, setArticles] = useState<MatterArticle[]>([]);
  const [searchResults, setSearchResults] = useState<NarrowedArticle[]>([]);

  useEffect(() => {
    const data = fetchLocalMatterArticles();

    if (!data) {
      throw new Error("articles failed to load");
    }

    setArticles(data);
  }, []);

  return (
    <div>
      <SearchBar articles={articles} setSearchResults={setSearchResults} />
      <SearchResultContainer results={searchResults} />
    </div>
  );
};
