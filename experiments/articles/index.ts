import { retrieveWeightedMatterArticles } from "../../sources/matter/index";
import { retrieveWeightedReadwiseArticles } from "../../sources/readwise-reader/retrieveAndFilter";
import { sendEmail } from "../../utils/send";
import { generateEmail } from "./generate-email";

const main = async () => {
	try {
		const { readwiseArticleTitle, readwiseArticleUrl, relatedArticles } =
			await retrieveWeightedReadwiseArticles();
		const { matterArticleTitle, matterArticleUrl, similarMatterArticles } =
			await retrieveWeightedMatterArticles();

		const emailHtml = generateEmail({
			readwiseArticleUrl,
			readwiseArticleTitle,
			relatedArticles,
			matterArticleUrl,
			matterArticleTitle,
			similarMatterArticles,
		});

		console.log("sending email with daily article...");

		await sendEmail(emailHtml);

		console.log("sent articles of the day");
	} catch (error) {
		console.error(`Error while sending article of the day: ${error}`);

		throw error;
	}
};

main();
