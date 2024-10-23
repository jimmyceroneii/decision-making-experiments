"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./searchBar";
import { SearchResultContainer } from "./searchResultContainer";
import { simpleSearch } from "./utils/search";
import { fetchLocalMatterArticles, fetchLocalReadwiseArticles } from "./utils/sources";
import type { MatterArticle, NarrowedArticle, ReadwiseArticle } from "./utils/types";

export const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<(MatterArticle | ReadwiseArticle)[]>([]);
  const [searchResults, setSearchResults] = useState<NarrowedArticle[]>([]);

  useEffect(() => {
    const matterArticles = fetchLocalMatterArticles();
    const readwiseArticles = fetchLocalReadwiseArticles();

    const data = [...matterArticles, ...readwiseArticles];

    if (data.length === 0) {
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
