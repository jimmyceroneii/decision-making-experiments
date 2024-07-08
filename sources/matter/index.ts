import { logger } from "../../utils/logger";
import { shuffleList } from "../../utils/randomizer";
import { fetchSimilar } from "../../utils/search";
import {
	Weighted,
	generateWeights,
	retrieveWeightedItem,
	sortWeightedList,
} from "../../utils/weightedRandomizer";
import { writeArrayToFile } from "../../utils/writeFile";
import { isValidMatterArticle } from "./filter";
import { matterArticleWeightFn } from "./matterWeightFn";
import {
	fetchLocalArticles,
	retrieveArticlesAndFormat,
} from "./processMatterCsv";
import type { MatterArticle } from "./types";

type RetrieveMatterArticlesReturnType = {
	matterArticleUrl: string;
	matterArticleTitle: string;
	similarMatterArticles: string[];
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

		logger("Finding similar matter articles...");

		const similarMatterArticles = await fetchSimilar(article.url);

		return {
			matterArticleUrl: article.url,
			matterArticleTitle: article.title || article.url,
			similarMatterArticles,
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
		const matterArticles = fetchLocalArticles();

		if (!matterArticles) {
			throw new Error("no local articles found");
		}

		const randomMatterArticle =
			await retrieveRandomMatterArticle(matterArticles);

		logger("Finding similar matter articles...");

		const similarMatterArticles = await fetchSimilar(randomMatterArticle.url);

		return {
			matterArticleUrl: randomMatterArticle.url,
			matterArticleTitle: randomMatterArticle.title || randomMatterArticle.url,
			similarMatterArticles,
		};
	};
