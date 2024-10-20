import { isWeeklyNewsletter } from "../../backend/sources/readwise-reader/filter";
import { fetchLocalReadwiseArticles } from "../../backend/sources/readwise-reader/readwise";
import type { ReadwiseArticle } from "../../backend/sources/readwise-reader/types";

type RetrieveReadwiseArticlesReturnType = {
	weeklyArticles: ReadwiseArticle[];
};

export const retrieveReadwiseArticle =
	async (): Promise<RetrieveReadwiseArticlesReturnType> => {
		const articles = fetchLocalReadwiseArticles();

		if (!articles) {
			throw new Error("no articles found in sync");
		}

		console.log("items before filtering: ", articles.length);

		const filteredArticles: ReadwiseArticle[] = articles.filter((article) =>
			isWeeklyNewsletter(article),
		);

		console.log("found weekly articles: ", filteredArticles.length);

		return {
			weeklyArticles: filteredArticles,
		};
	};
