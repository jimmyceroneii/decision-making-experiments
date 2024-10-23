import type { MatterArticle } from "../../backend/sources/matter/types";
import type { ReadwiseArticle } from "../../backend/sources/readwise-reader/types";

export type Article = MatterArticle | ReadwiseArticle;

export type NarrowedArticle = {
	url: string;
	title: string;
};

export type SimpleSearchParams<T> = {
	searchTerm: string;
	list: Article[];
};
