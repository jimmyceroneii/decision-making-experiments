import fs from "node:fs/promises";
import {
	retrieveAllReadwiseArticles,
	retrieveReadwiseArticleByTag,
} from "../../sources/readwise-reader/retrieveArticles";
import type { ReadwiseArticle } from "../../sources/readwise-reader/types";
import type {
	ReflectBacklink,
	ReflectBlock,
	ReflectContent,
	ReflectDocument,
} from "./types";

const findBackLinks = (
	content: ReflectContent | ReflectContent[],
): ReflectBacklink[] => {
	if (Array.isArray(content)) {
		return content.flatMap(findBackLinks);
	}
	// biome-ignore lint: This else clause is necessary for the function's logic
	else if (Array.isArray(content.content)) {
		return content.content.flatMap(findBackLinks);
	}
	// biome-ignore lint: This else clause is necessary for the function's logic
	else if (content.type === "backlink") {
		return [content as ReflectBacklink];
	}

	return [];
};

type FindRawUrlsParams = {
	backlinks: ReflectBacklink[];
	readwiseArticles: ReadwiseArticle[];
};

const findRawUrls = (params: FindRawUrlsParams) => {
	const { backlinks, readwiseArticles } = params;

	const rawUrls = backlinks.map((backlink) => {
		const title = backlink.attrs.label;
		const readwiseArticle = readwiseArticles.find((article) =>
			article?.title?.includes(title),
		);

		return {
			title,
			url: readwiseArticle?.source_url || readwiseArticle?.url,
		};
	});

	return rawUrls;
};

const main = async () => {
	try {
		const filePath =
			"/Users/personal/Documents/decision-making-projects/writing-randomizer/writing-cache/last-week-i-learned/deep-dives/home-robotics.json";
		const fileContent = await fs.readFile(filePath, "utf8");

		const reflectDocument: ReflectDocument = JSON.parse(fileContent);

		const jsonContent = reflectDocument.document_json;
		const parsedReflectBlock: ReflectBlock = JSON.parse(jsonContent);

		const content: ReflectContent[] | ReflectContent =
			parsedReflectBlock.content;

		const backlinks = findBackLinks(content);
		console.log("🔗 Backlinks found: ", backlinks.length);

		const readwiseArticles = retrieveAllReadwiseArticles();
		console.log("📚 Readwise articles found: ", readwiseArticles.length);

		const rawUrls = findRawUrls({ backlinks, readwiseArticles });
		console.log("🔗 Raw URLs:", rawUrls.length);

		console.log("\n\n\n");

		// sort so the articles with URLs are at the top
		rawUrls.sort((a, b) => {
			if (a.url) {
				return -1;
			}
			if (b.url) {
				return 1;
			}
			return 0;
		});

		for (const rawUrl of rawUrls) {
			console.log("Title: ", rawUrl.title);
			console.log("URL: ", rawUrl.url);
			console.log("---");
		}
	} catch (error) {
		console.error("Error reading file:", error);
	}
};

main();
