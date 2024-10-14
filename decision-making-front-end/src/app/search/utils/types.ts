export type MatterArticle = {
  id: string;
  title: string;
  author: string | null;
  publisher: string | null;
  url: string;
  tags: string;
  wordCount: number;
  inQueue: boolean;
  favorited: boolean;
  read: boolean;
  highlightCount: number;
  lastInteractionDate: string;
};

export type Article = MatterArticle;

export type NarrowedArticle = {
  url: string;
  title: string;
};

export type SimpleSearchParams<T> = {
  searchTerm: string;
  list: Article[];
};
