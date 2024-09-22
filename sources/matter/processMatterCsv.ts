import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "csv-parse";
import type { ValidationError } from "joi";
import { logger } from "../../utils/logger";
import { type MatterArticle, matterArticleSchema } from "./types";

export const convertToBoolean = (field: string): boolean => {
	// biome-ignore lint: fixes csv to type problem
	return field.toLowerCase() === "true" ? true : false;
};

export const convertToId = (id: string | undefined): string => {
	if (!id) {
		return "";
	}

	return id.split("_")[1].split(".")[0];
};

const convertCsvToTypedArray = async (
	filename: string,
): Promise<{ articles: MatterArticle[]; errors: ValidationError[] }> => {
	return new Promise((resolve, reject) => {
		const articles: MatterArticle[] = [];

		const errorsArray: ValidationError[] = [];

		let isFirstRow = true;

		let i = 0;

		fs.createReadStream(filename)
			.pipe(parse({ delimiter: "," }))
			// biome-ignore lint: no type, coming from csv
			.on("data", (row: any) => {
				if (isFirstRow) {
					isFirstRow = false;
					return;
				}

				const [
					title,
					author,
					publisher,
					url,
					tags,
					wordCount,
					inQueue,
					favorited,
					read,
					highlightCount,
					lastInteractionDate,
					id,
				] = row;

				const rowObject = {
					id: convertToId(id),
					title,
					author,
					publisher,
					url,
					tags,
					wordCount: wordCount === "" ? 0 : Number.parseInt(wordCount),
					inQueue: convertToBoolean(inQueue),
					favorited: convertToBoolean(favorited),
					read: convertToBoolean(read),
					highlightCount,
					lastInteractionDate,
				};

				const validationResult = matterArticleSchema.validate(rowObject);

				if (validationResult.error) {
					if (i < 10) {
						logger(JSON.stringify(validationResult.error.details));
						logger(JSON.stringify(row));
					}

					errorsArray.push(validationResult.error);

					i++;
				} else {
					articles.push(rowObject);
				}
			})
			.on("end", () => {
				resolve({ articles, errors: errorsArray });
			})
			.on("error", (err) => {
				reject(err);
			});
	});
};

export const retrieveArticlesAndFormat = async () => {
	const absolutePath = path.resolve(__dirname, ".");

	const filePath = path.join(absolutePath, "_matter_history.csv");

	return await convertCsvToTypedArray(filePath);
};

export const fetchLocalMatterArticles = (): MatterArticle[] | undefined => {
	let data: MatterArticle[];

	try {
		const rawData = fs.readFileSync("sources/matter/backup.json", "utf8");

		data = JSON.parse(rawData);

		return data;
	} catch (err) {
		console.error(err);

		return undefined;
	}
};
