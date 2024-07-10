import { fetchLocalArticles } from "../../sources/readwise-reader/fetch";
import { isValidReadwiseArticle } from "../../sources/readwise-reader/filter";
import { logger } from "../../utils/logger";
import { shuffleList } from "../../utils/randomizer";
import { fetchSearch } from "../../utils/search";
import type { DocumentContent } from "../../utils/types";
import {
	generateWeights,
	retrieveWeightedItem,
	sortWeightedList,
} from "../../utils/weightedRandomizer";
import { readwiseArticleWeightFn } from "./readwiseWeightFn";
import type { ReadwiseArticle } from "./types";

type RetrieveReadwiseArticlesReturnType = {
	readwiseArticleUrl: string;
	readwiseArticleTitle: string;
	relatedArticles: DocumentContent[];
};

export const retrieveReadwiseArticle =
	async (): Promise<RetrieveReadwiseArticlesReturnType> => {
		const articles = fetchLocalArticles();

		if (!articles) {
			throw new Error("no articles found in json backup");
		}

		console.log("filtering to only valid articles");

		const filteredArticles = articles.filter((data) =>
			isValidReadwiseArticle(data),
		);

		console.log(
			"number of articles after filtering: ",
			filteredArticles.length,
		);

		const shuffledReadwiseArticles = shuffleList(filteredArticles);

		const randomReadwiseArticle = shuffledReadwiseArticles[0];

		console.log(randomReadwiseArticle);

		console.log("Found random readwise article: ", randomReadwiseArticle.title);

		const readwiseArticleUrl = randomReadwiseArticle.url;

		console.log("Finding related articles...");

		const relatedArticles = await fetchSearch(randomReadwiseArticle.title);

		return {
			readwiseArticleUrl,
			readwiseArticleTitle: randomReadwiseArticle.title || readwiseArticleUrl,
			relatedArticles,
		};
	};

export const retrieveWeightedReadwiseArticles =
	async (): Promise<RetrieveReadwiseArticlesReturnType> => {
		const articles = fetchLocalArticles();

		if (!articles) {
			throw new Error("no articles found in json backup");
		}

		logger("filtering to only valid articles");

		const filteredArticles = articles.filter((data) =>
			isValidReadwiseArticle(data),
		);

		logger(`number of articles after filtering: ${filteredArticles.length}`);

		const date = new Date();

		const weightFn = (item: ReadwiseArticle) =>
			readwiseArticleWeightFn({ article: item, date });

		logger("generating weights...");

		const weightedRandomArticles = generateWeights<ReadwiseArticle>({
			list: filteredArticles,
			weightFn,
		});

		logger("sorting weighted articles...");

		const sortedRandomArticles = sortWeightedList({
			weightedList: weightedRandomArticles,
		});

		logger("selecting random article...");

		const article = retrieveWeightedItem({
			listSortedByWeight: sortedRandomArticles,
		});

		if (!article) {
			throw new Error("randomness failed, no article found!");
		}

		logger(`Found random readwise article: ${article.title}`);

		const readwiseArticleUrl = article.url;

		console.log("Finding related articles...");

		const relatedArticles = await fetchSearch(article.title);

		return {
			readwiseArticleUrl,
			readwiseArticleTitle: article.title || readwiseArticleUrl,
			relatedArticles,
		};
	};
