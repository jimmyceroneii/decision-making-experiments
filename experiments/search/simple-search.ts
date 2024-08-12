import { isValidMatterArticle } from "../../sources/matter/filter";
import { fetchLocalArticles } from "../../sources/matter/processMatterCsv";
import type { MatterArticle } from "../../sources/matter/types";
import { logger } from "../../utils/logger";

type SimpleSearchParams = {
	searchTerm: string;
};

const parseSearchTerm = (searchTerm: string) => {
	const trimmedTerm = searchTerm.trim();
	const splitTerm = trimmedTerm.split(" ");
	const filteredSplitTerms = splitTerm.filter((term) => term.length > 3);

	return filteredSplitTerms;
};

export const simpleSearch = (simpleSearchParams: SimpleSearchParams): void => {
	const articles = fetchLocalArticles();

	if (!articles) {
		throw new Error("no articles found in json backup");
	}

	logger("filtering to only valid articles");

	const filteredArticles = articles.filter((data) =>
		isValidMatterArticle(data),
	);

	logger(`number of articles after filtering: ${filteredArticles.length}`);

	const parsedSearchTerms = parseSearchTerm(simpleSearchParams.searchTerm);

	console.log("parsedSearchTerms: ", parsedSearchTerms);

	const foundItems: MatterArticle[] = [];

	for (const term in parsedSearchTerms) {
		foundItems.concat(
			filteredArticles.filter((article) => article.title.includes(term)),
		);
	}

	console.log("foundItems: ", foundItems.length);
};

const search = simpleSearch({ searchTerm: "ethical eating" });
