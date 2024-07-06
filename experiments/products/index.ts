import * as fs from "node:fs";
import { shuffleList } from "../../utils/randomizer";
import { fetchSearch, fetchSimilar } from "../../utils/search";
import { sendEmail } from "../../utils/send";
import { generateEmail } from "./generate-email";

const main = async () => {
	const filePath: string = "sources/products-reminders-export/products.txt";

	try {
		const fileContent: string = fs.readFileSync(filePath, "utf-8");
		const products: string[] = fileContent.split("\n");

		const randomProduct = shuffleList(products)[0];

		console.log("Product: ", randomProduct);

		console.log("Finding news stories...");

		const sources = await fetchSearch(
			`Here is some information about the following product: ${randomProduct}`,
		);

		const sourceUrls = sources.map((source) => source.url);

		console.log("Sources: ", sourceUrls);

		console.log("Finding similar products...");

		const similar = await fetchSimilar(randomProduct);

		console.log("Similar: ", similar);

		const emailHtml = generateEmail(randomProduct, sourceUrls, similar);

		await sendEmail(emailHtml);

		console.log("sent product of the week");
	} catch (error) {
		console.error(`Error with the product of the week: ${error}`);
	}
};

main();
