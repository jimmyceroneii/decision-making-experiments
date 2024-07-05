import * as fs from "fs";
import { shuffleList } from "../../utils/randomizer";

const main = async () => {
	const filePath: string = "sources/movies-netflix-export/movies.txt";

	try {
		const fileContent: string = fs.readFileSync(filePath, "utf-8");
		const movies: string[] = fileContent.split("\n");

		const randomMovie = shuffleList(movies)[0];

		console.log("Movie: ", randomMovie);
	} catch (error) {
		console.error(`Error with the random movie: ${error}`);
	}
};

main();
