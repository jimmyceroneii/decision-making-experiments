import { logger } from "../../utils/logger";
import type { Article, NarrowedArticle, SimpleSearchParams } from "./types";

const parseSearchTerm = (searchTerm: string) => {
	const trimmedTerm = searchTerm.trim();
	const splitTerm = trimmedTerm
		.split(":")
		.join(" ")
		.split(",")
		.join(" ")
		.split("?")
		.join(" ")
		.split('"')
		.join(" ")
		.split(" ");
	const filteredSplitTerms = splitTerm.filter((term) => term.length > 4);

	const lowerCasedFilteredTerms = filteredSplitTerms.map((term) =>
		term.toLowerCase(),
	);

	return lowerCasedFilteredTerms;
};

export const simpleSearch = <T>({
	searchTerm,
	list,
}: SimpleSearchParams<T>): NarrowedArticle[] => {
	const parsedSearchTerms = parseSearchTerm(searchTerm);

	console.log("parsedSearchTerms: ", parsedSearchTerms);

	const foundItems: Article[] = [];

	for (const term of parsedSearchTerms) {
		const matches = list.filter((item) => {
			return (
				item.title.toLowerCase().includes(term) ||
				item.url.toLowerCase().includes(term)
			);
		});

		logger(`matches for ${term}: ${matches.length}`);

		foundItems.push(...matches);
	}

	logger(`foundItems: ${foundItems.length}`);

	const narrowedFoundItems = foundItems.map((item) => {
		return {
			title: item.title,
			url: item.url,
		};
	});

	return narrowedFoundItems;
};
