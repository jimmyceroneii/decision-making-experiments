import { isValidMatterArticle } from "../../sources/matter/filter";
import { fetchLocalArticles } from "../../sources/matter/processMatterCsv";
import { MatterArticle } from "../../sources/matter/types";
import { logger } from "../../utils/logger";

type SimpleSearchParams = {
	searchTerm: string;
	searchList: MatterArticle[];
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
};
