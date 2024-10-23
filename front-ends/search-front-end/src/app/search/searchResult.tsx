import { NarrowedArticle } from "./utils/types";

type SearchResultParams = {
  result: NarrowedArticle;
};

export const SearchResult: React.FC<SearchResultParams> = ({ result }) => {
  return (
    <div>
      <h1>
        <a href={result?.url || ""}>{result?.title || ""}</a>
      </h1>
    </div>
  );
};
