import { shuffleList } from "../../utils/randomizer";
import { fetchSimilar } from "../../utils/search";
import {
	Weighted,
	generateWeights,
	retrieveWeightedItem,
	sortWeightedList,
} from "../../utils/weightedRandomizer";
import { isValidMatterArticle } from "./filter";
import { matterArticleWeightFn } from "./matterWeightFn";
import { retrieveArticlesAndFormat } from "./processMatterCsv";
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

		console.log("matter articles: ", matterArticles.length);
		console.log("matter errors: ", errors.length);

		console.log("filtering matter articles");

		const filteredMatterArticles = matterArticles.filter((article) =>
			isValidMatterArticle(article),
		);

		console.log(
			"matter articles left after filter: ",
			filteredMatterArticles.length,
		);

		console.log("generating weights...");

		const weightedRandomArticles = generateWeights<MatterArticle>({
			list: filteredMatterArticles,
			weightFn,
		});

		console.log("sorting weighted articles...");

		const sortedRandomArticles = sortWeightedList({
			weightedList: weightedRandomArticles,
		});

		console.log("selecting random article...");

		const article = retrieveWeightedItem({
			listSortedByWeight: sortedRandomArticles,
		});

		if (!article) {
			throw new Error("randomness failed, no article found!");
		}

		console.log("Found random matter article: ", article.title);

		console.log("Finding similar matter articles...");

		const similarMatterArticles = await fetchSimilar(article.url);

		return {
			matterArticleUrl: article.url,
			matterArticleTitle: article.title || article.url,
			similarMatterArticles,
		};
	};

export const retrieveMatterArticles =
	async (): Promise<RetrieveMatterArticlesReturnType> => {
		const { articles: matterArticles, errors } =
			await retrieveArticlesAndFormat();

		console.log("matter articles: ", matterArticles.length);
		console.log("matter errors: ", errors.length);

		const shuffledMatterArticles = shuffleList(matterArticles);

		console.log("filtering matter articles");

		const filteredMatterArticles = shuffledMatterArticles.filter((article) =>
			isValidMatterArticle(article),
		);

		console.log(
			"matter articles left after filter: ",
			filteredMatterArticles.length,
		);

		const randomMatterArticle = filteredMatterArticles[0];

		console.log(randomMatterArticle);

		console.log("Found random matter article: ", randomMatterArticle.title);

		console.log("Finding similar matter articles...");

		const similarMatterArticles = await fetchSimilar(randomMatterArticle.url);

		return {
			matterArticleUrl: randomMatterArticle.url,
			matterArticleTitle: randomMatterArticle.title || randomMatterArticle.url,
			similarMatterArticles,
		};
	};
