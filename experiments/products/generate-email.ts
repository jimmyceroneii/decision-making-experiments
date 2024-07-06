import fs from "node:fs";
import ejs from "ejs";

export const generateEmail = (
	product: string,
	sources: string[],
	similarProducts: string[],
) => {
	const templateString = fs.readFileSync(
		"experiments/products/email-templates/email.ejs",
		"utf-8",
	);

	return ejs.render(templateString, { product, sources, similarProducts });
};
