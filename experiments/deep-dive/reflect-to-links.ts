import fs from "node:fs/promises";
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
		console.log("Backlinks:", backlinks);
	} catch (error) {
		console.error("Error reading file:", error);
	}
};

main();
