import type { DocumentContent, Result } from "./types";

import * as dotenv from "dotenv";
dotenv.config();

export const fetchSimilar = async (url: string): Promise<string[]> => {
	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			"x-api-key": process.env.EXA_API_KEY ?? "",
		},
		body: JSON.stringify({ url }),
	};

	const rawSimilar = await fetch("https://api.exa.ai/findSimilar", options);

	const similar: { results: Result[] } = await rawSimilar.json();

	return similar.results.map((result) => result.url);
};

export const fetchSearch = async (
	searchTerm: string,
): Promise<DocumentContent[]> => {
	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			"x-api-key": process.env.EXA_API_KEY ?? "",
		},
		body: JSON.stringify({ query: searchTerm }),
	};

	const rawSearchResults = await fetch("https://api.exa.ai/search", options);

	const searchResults = await rawSearchResults.json();

	return searchResults.results;
};
