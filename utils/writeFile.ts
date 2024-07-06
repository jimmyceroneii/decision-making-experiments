import * as fs from "node:fs";

export const writeArrayToFile = <T>({
	filePath,
	array,
}: { filePath: string; array: T[] }) => {
	const arrayString = JSON.stringify(array, null, 2);

	fs.writeFile(filePath, arrayString, "utf8", (err) => {
		if (err) {
			console.error("Error writing file", err);
		} else {
			console.log("File has been written successfully");
		}
	});
};
