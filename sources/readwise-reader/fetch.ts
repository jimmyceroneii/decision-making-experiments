import fs from "node:fs";
import { sendRequestWithRetry } from "../../utils/retry";
import type { ReadwiseArticle } from "./types";

export const fetchDocumentListApi = async () => {
	const fullData: ReadwiseArticle[] = [];
	let nextPageCursor = null;

	while (true) {
		const queryParams = new URLSearchParams();
		if (nextPageCursor) {
			queryParams.append("pageCursor", nextPageCursor);
		}
		console.log(
			"Making export api request with params " + queryParams.toString(),
		);
		const response = await sendRequestWithRetry<{
			results: ReadwiseArticle[];
			nextPageCursor: string;
		}>("https://readwise.io/api/v3/list/?" + queryParams.toString());
		fullData.push(...response["results"]);
		nextPageCursor = response["nextPageCursor"];
		if (!nextPageCursor) {
			break;
		}
	}

	console.log("items before filtering: ", fullData.length);

	return fullData;
};

export const fetchLocalArticles = (): ReadwiseArticle[] | undefined => {
	let data: ReadwiseArticle[];

	try {
		const rawData = fs.readFileSync(
			"sources/readwise-reader/backup.json",
			"utf8",
		);

		data = JSON.parse(rawData);

		return data;
	} catch (err) {
		console.error(err);

		return undefined;
	}
};
