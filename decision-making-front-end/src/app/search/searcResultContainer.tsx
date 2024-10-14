import { useEffect, useState } from "react";
import { SearchResult } from "./searchResult";
import { NarrowedArticle } from "./utils/types";

type SearchResultContainerProps = {
  results: NarrowedArticle[];
};

export const SearchResultContainer: React.FC<SearchResultContainerProps> = ({
  results,
}) => {
  const [narrowedResults, setNarrowedResults] = useState<NarrowedArticle[]>([]);

  useEffect(() => {
    const truncatedResults = results?.slice(0, 9);
    setNarrowedResults(truncatedResults);
  }, [results]);

  return (
    <div>
      <ol>
        {narrowedResults.map((article) => (
          <li>
            <SearchResult result={article} />
          </li>
        ))}
      </ol>
    </div>
  );
};
