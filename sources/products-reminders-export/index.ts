import * as fs from "node:fs";
import { shuffleList } from "../../utils/randomizer";

export const retrieveRandomRemindersProduct = (): string => {
	const filePath: string = "sources/products-reminders-export/products.txt";

	try {
		const fileContent: string = fs.readFileSync(filePath, "utf-8");
		const products: string[] = fileContent.split("\n");

		const randomProduct = shuffleList(products)[0];

		return randomProduct;
	} catch (error) {
		throw new Error(`Error with the product of the week: ${error}`);
	}
};
