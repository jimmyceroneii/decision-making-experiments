import { sendEmail } from "../../utils/send";
import { appendToReflect } from "./append-to-reflect";
import { generateEmail } from "./generate-email";
import { retrieveReadwiseArticle } from "./retrieveAndFilter";

const main = async () => {
	try {
		const { weeklyArticles } = await retrieveReadwiseArticle();

		console.log(
			"weeklyArticles: ",
			weeklyArticles.map((article) => article.title),
		);

		console.log("\ngenerating template...");

		const newsletterTemplate = generateEmail({ weeklyArticles });

		console.log("\nsending email...");

		await sendEmail(newsletterTemplate);

		console.log("\nappending to reflect...");

		await appendToReflect(newsletterTemplate);
	} catch (error) {
		console.error(`Error while setting up newsletter: ${error}`);
		throw error;
	}
};

main();
