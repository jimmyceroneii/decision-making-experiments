import { isValidAlbum } from "../../sources/readwise-reader/filter";
import { fetchLocalReadwiseArticles } from "../../sources/readwise-reader/readwise";
import type { ReadwiseArticle } from "../../sources/readwise-reader/types";
import { shuffleList } from "../../utils/randomizer";

export const retrieveRandomAlbum = (): ReadwiseArticle => {
	const items = fetchLocalReadwiseArticles();

	if (!items) {
		throw new Error("no articles found in json backup");
	}

	console.log("filtering to only valid articles");

	const filteredAlbums = items.filter((data) => isValidAlbum(data));

	console.log("number of albums after filtering: ", filteredAlbums.length);

	const shuffledReadwiseArticles = shuffleList(filteredAlbums);

	return shuffledReadwiseArticles[0];
};
