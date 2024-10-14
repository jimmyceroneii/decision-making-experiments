"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./searchBar";
import { MatterArticle, NarrowedArticle } from "./utils/types";
import { fetchLocalMatterArticles } from "./utils/sources";
import { simpleSearch } from "./utils/search";
import { SearchResultContainer } from "./searcResultContainer";

export const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState<MatterArticle[]>([]);

  const searchFn = (term: string): NarrowedArticle[] => {
    setSearchTerm(term);
    return simpleSearch({ searchTerm: term, list: articles });
  };

  useEffect(() => {
    const data = fetchLocalMatterArticles();

    if (!data) {
      throw new Error("articles failed to load");
    }

    setArticles(data);
  });

  return (
    <div>
      <SearchBar searchTerm={searchTerm} searchFn={searchFn} />
      <SearchResultContainer results={articles} />
    </div>
  );
};
