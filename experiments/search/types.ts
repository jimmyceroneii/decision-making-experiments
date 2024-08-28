import type { MatterArticle } from "../../sources/matter/types";
import type { ReadwiseArticle } from "../../sources/readwise-reader/types";

export type Article = MatterArticle | ReadwiseArticle;

export type NarrowedArticle = {
	url: string;
	title: string;
};

export type SimpleSearchParams<T> = {
	searchTerm: string;
	list: Article[];
};
