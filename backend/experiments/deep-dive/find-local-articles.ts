import { fetchLocalMatterArticles } from "../../backend/sources/matter/processMatterCsv";
import { fetchLocalReadwiseArticles } from "../../backend/sources/readwise-reader/readwise";
import { simpleSearch } from "../search/simple-search";

const findLocalMatterArticles = (searchTerm: string) => {
	const articles = fetchLocalMatterArticles();

	if (!articles) {
		return [];
	}

	const relatedArticles = simpleSearch({ searchTerm, list: articles });

	return relatedArticles;
};

const findLocalReadwiseArticles = (searchTerm: string) => {
	const articles = fetchLocalReadwiseArticles();

	if (!articles) {
		return [];
	}

	const relatedArticles = simpleSearch({ searchTerm, list: articles });

	return relatedArticles;
};

const findLocalArticlesForDeepDive = (searchTerm: string) => {
	const matterArticles = findLocalMatterArticles(searchTerm);
	const readwiseArticles = findLocalReadwiseArticles(searchTerm);

	return {
		matterArticles,
		readwiseArticles,
	};
};

console.log(findLocalArticlesForDeepDive("frank"));
