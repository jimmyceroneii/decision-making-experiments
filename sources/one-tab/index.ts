import * as fs from "node:fs";

export const processOneTab = (): string[] => {
	const file = fs.readFileSync("sources/one-tab/frank-sinatra.txt", "utf8");

	const urls = file
		.split("\n")
		.map((line) => line.trim().split("|")[0].trim())
		.filter((line) => line.startsWith("https://"));

	return urls;
};
