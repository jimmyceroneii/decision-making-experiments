import fs from "node:fs";
import ejs from "ejs";

type GenerateEmailParams = {
	remindersProduct: string;
	remindersSources: string[];
	remindersSimilarProducts: string[];
	matterProduct: string;
	matterSources: string[];
	matterSimilarProducts: string[];
	readwiseProduct: string;
	readwiseSources: string[];
	readwiseSimilarProducts: string[];
};

export const generateEmail = ({
	remindersProduct,
	remindersSources,
	remindersSimilarProducts,
	matterProduct,
	matterSources,
	matterSimilarProducts,
	readwiseProduct,
	readwiseSources,
	readwiseSimilarProducts,
}: GenerateEmailParams) => {
	const templateString = fs.readFileSync(
		"experiments/products/email-templates/email.ejs",
		"utf-8",
	);

	return ejs.render(templateString, {
		remindersProduct,
		remindersSources,
		remindersSimilarProducts,
		matterProduct,
		matterSources,
		matterSimilarProducts,
		readwiseProduct,
		readwiseSources,
		readwiseSimilarProducts,
	});
};
