import { simpleSearch } from "../../backend/experiments/search/simple-search";
import type { NarrowedArticle } from "../../backend/experiments/search/types";
import { fetchSearch } from "../../utils/exa";
import { logger } from "../../utils/logger";
import { shuffleList } from "../../utils/randomizer";
import type { DocumentContent } from "../../utils/types";
import {
	generateWeights,
	retrieveWeightedItem,
	sortWeightedList,
} from "../../utils/weightedRandomizer";
import { isValidReadwiseArticle } from "./filter";
import { fetchLocalReadwiseArticles } from "./readwise";
import { readwiseArticleWeightFn } from "./readwiseWeightFn";
import type { ReadwiseArticle } from "./types";

type RetrieveReadwiseArticlesReturnType = {
	readwiseArticleUrl: string;
	readwiseArticleTitle: string;
	relatedArticles: DocumentContent[];
	relatedLocalReadwiseArticles: NarrowedArticle[];
};

export const retrieveRandomReadwiseArticle =
	async (): Promise<RetrieveReadwiseArticlesReturnType> => {
		const articles = fetchLocalReadwiseArticles();

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

		const relatedLocalReadwiseArticles = simpleSearch({
			searchTerm: randomReadwiseArticle.title,
			list: filteredArticles,
		});

		return {
			readwiseArticleUrl,
			readwiseArticleTitle: randomReadwiseArticle.title || readwiseArticleUrl,
			relatedArticles,
			relatedLocalReadwiseArticles,
		};
	};

export const retrieveWeightedReadwiseArticles =
	async (): Promise<RetrieveReadwiseArticlesReturnType> => {
		const articles = fetchLocalReadwiseArticles();

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

		const relatedLocalReadwiseArticles = simpleSearch({
			searchTerm: article.title,
			list: filteredArticles,
		});

		return {
			readwiseArticleUrl,
			readwiseArticleTitle: article.title || readwiseArticleUrl,
			relatedArticles,
			relatedLocalReadwiseArticles,
		};
	};

export const retrieveAllReadwiseArticles = (): ReadwiseArticle[] => {
	const articles = fetchLocalReadwiseArticles();

	if (!articles) {
		throw new Error("no articles found in json backup");
	}

	return articles;
};

export const retrieveReadwiseArticleByTag = (
	tagName: string,
): ReadwiseArticle[] => {
	const articles = fetchLocalReadwiseArticles();

	if (!articles) {
		throw new Error("no articles found in json backup");
	}

	const filteredArticles = articles.filter((article) => {
		const tags = Object.keys(article.tags || {});

		if (!tags) {
			return false;
		}

		return tags.includes(tagName);
	});

	return filteredArticles;
};
