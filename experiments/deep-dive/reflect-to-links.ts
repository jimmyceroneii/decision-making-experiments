import fs from "node:fs/promises";

type ReflectDocument = {
	id: string;
	subject: string;
	document_json: string;
	created_at: string;
	updated_at: string;
	edited_at: string;
	daily_at: unknown;
	backlinked_count: number;
};

type ReflectBlock = {
	type: string;
	attrs: Record<string, unknown>;
	content: ReflectContent | ReflectContent[];
};

interface ReflectContent {
	type: string;
	text: string;
	attrs: Record<string, unknown>;
	content?: ReflectContent[];
};

interface ReflectBacklink extends ReflectContent {
	type: 'backlink';
	attrs: {
		id: string;
		label: string;
		graphId: string;
	}
}

const findBackLinks = (content: ReflectContent | ReflectContent[]): ReflectBacklink[] => {
	if (Array.isArray(content)) {
        return content.flatMap(findBackLinks);
    } else if (Array.isArray(content.content)) {
		return content.content.flatMap(findBackLinks);
	}  else if (content.type === 'backlink') {
        return [content as ReflectBacklink];
    } else {
		return [];
	}    
};

const main = async () => {
	try {
		const filePath =
			"/Users/personal/Documents/decision-making-projects/writing-randomizer/writing-cache/last-week-i-learned/deep-dives/home-robotics.json";
		const fileContent = await fs.readFile(filePath, "utf8");

		const reflectDocument: ReflectDocument = JSON.parse(fileContent);

		const jsonContent = reflectDocument.document_json;
		const parsedReflectBlock: ReflectBlock = JSON.parse(jsonContent);

		const content: ReflectContent[] | ReflectContent = parsedReflectBlock.content;
		
		const backlinks = findBackLinks(content);
		console.log("Backlinks:", backlinks);
	} catch (error) {
		console.error("Error reading file:", error);
	}
};

main();
