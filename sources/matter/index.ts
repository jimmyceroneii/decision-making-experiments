import { simpleSearch } from "../../experiments/search/simple-search";
import type { NarrowedArticle } from "../../experiments/search/types";
import { fetchSimilar } from "../../utils/exa";
import { logger } from "../../utils/logger";
import { shuffleList } from "../../utils/randomizer";
import {
	generateWeights,
	retrieveWeightedItem,
	sortWeightedList,
} from "../../utils/weightedRandomizer";
import { isValidMatterArticle } from "./filter";
import { matterArticleWeightFn } from "./matterWeightFn";
import {
	fetchLocalMatterArticles,
	retrieveArticlesAndFormat,
} from "./processMatterCsv";
import type { MatterArticle } from "./types";

type RetrieveMatterArticlesReturnType = {
	matterArticleUrl: string;
	matterArticleTitle: string;
	similarMatterArticles: string[];
	relatedLocalMatterArticles: NarrowedArticle[];
};

export const retrieveWeightedMatterArticles =
	async (): Promise<RetrieveMatterArticlesReturnType> => {
		const { articles: matterArticles, errors } =
			await retrieveArticlesAndFormat();

		const date = new Date();

		const weightFn = (item: MatterArticle) =>
			matterArticleWeightFn({ article: item, date });

		logger(`matter articles: ${matterArticles.length}`);
		logger(`matter errors: ${errors.length}`);

		logger("filtering matter articles");

		const filteredMatterArticles = matterArticles.filter((article) =>
			isValidMatterArticle(article),
		);

		logger(
			`matter articles left after filter: ${filteredMatterArticles.length}`,
		);

		logger("generating weights...");

		const weightedRandomArticles = generateWeights<MatterArticle>({
			list: filteredMatterArticles,
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

		logger(`Found random matter article: ${article.title}`);

		logger("Finding similar matter articles with EXA...");

		const similarMatterArticlesUntrimmed = await fetchSimilar(article.url);

		logger("Finding similar matter articles locally...");

		const relatedLocalMatterArticlesUntrimmed = simpleSearch({
			searchTerm: article.title,
			list: filteredMatterArticles,
		});

		// trim to only 3 for local and exa
		const similarMatterArticles = similarMatterArticlesUntrimmed.slice(0, 3);
		const relatedLocalMatterArticles =
			relatedLocalMatterArticlesUntrimmed.slice(0, 3);

		return {
			matterArticleUrl: article.url,
			matterArticleTitle: article.title || article.url,
			similarMatterArticles,
			relatedLocalMatterArticles,
		};
	};

export const retrieveRandomMatterArticle = async (
	matterArticles: MatterArticle[],
): Promise<MatterArticle> => {
	logger(`matter articles: ${matterArticles.length}`);

	const shuffledMatterArticles = shuffleList(matterArticles);

	logger("filtering matter articles");

	const filteredMatterArticles = shuffledMatterArticles.filter((article) =>
		isValidMatterArticle(article),
	);

	logger(`matter articles left after filter: ${filteredMatterArticles.length}`);

	const randomMatterArticle = filteredMatterArticles[0];

	logger(JSON.stringify(randomMatterArticle));

	logger(`Found random matter article: ${randomMatterArticle.title}`);

	return randomMatterArticle;
};

export const retrieveMatterArticles =
	async (): Promise<RetrieveMatterArticlesReturnType> => {
		const matterArticles = fetchLocalMatterArticles();

		if (!matterArticles) {
			throw new Error("no local articles found");
		}

		const randomMatterArticle =
			await retrieveRandomMatterArticle(matterArticles);

		logger("Finding similar matter articles...");

		const similarMatterArticles = await fetchSimilar(randomMatterArticle.url);

		const relatedLocalMatterArticles = simpleSearch({
			searchTerm: randomMatterArticle.title,
			list: matterArticles,
		});

		return {
			matterArticleUrl: randomMatterArticle.url,
			matterArticleTitle: randomMatterArticle.title || randomMatterArticle.url,
			similarMatterArticles,
			relatedLocalMatterArticles,
		};
	};

export const retrieveRandomMatterProduct = (): MatterArticle => {
	const articles = fetchLocalMatterArticles();

	if (!articles) {
		throw new Error("no local products found");
	}

	const products = articles.filter((article) =>
		article.tags.includes("products"),
	);

	const randomProduct = shuffleList(products)[0];

	return randomProduct;
};
