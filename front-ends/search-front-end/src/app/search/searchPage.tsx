"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./searchBar";
import { MatterArticle, NarrowedArticle } from "./utils/types";
import { fetchLocalMatterArticles } from "./utils/sources";
import { SearchResultContainer } from "./searchResultContainer";
import { simpleSearch } from "./utils/search";

export const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<MatterArticle[]>([]);
  const [searchResults, setSearchResults] = useState<NarrowedArticle[]>([]);

  useEffect(() => {
    const data = fetchLocalMatterArticles();

    if (!data) {
      throw new Error("articles failed to load");
    }

    setArticles(data);
  }, []);

  useEffect(() => {
      setSearchResults(simpleSearch({ searchTerm, list: articles }).slice(0, 9));
  }, [searchTerm])

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchResultContainer results={searchResults} />
    </div>
  );
};
