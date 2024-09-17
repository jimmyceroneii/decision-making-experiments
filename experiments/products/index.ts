import { retrieveRandomMatterProduct } from "../../sources/matter";
import { retrieveRandomRemindersProduct } from "../../sources/products-reminders-export";
import { sendEmail } from "../../utils/send";
import { generateEmail } from "./generate-email";
import { fetchProductInformation } from "./utils";

const main = async () => {
	const remindersProduct = retrieveRandomRemindersProduct();
	const matterProduct = retrieveRandomMatterProduct();

	const { sourceUrls: remindersSources, similar: remindersSimilarProducts } =
		await fetchProductInformation(remindersProduct);

	const { sourceUrls: matterSources, similar: matterSimilarProducts } =
		await fetchProductInformation(matterProduct.url);

	const emailHtml = generateEmail({
		remindersProduct,
		remindersSources,
		remindersSimilarProducts,
		matterProduct: matterProduct.url,
		matterSources,
		matterSimilarProducts,
	});

	await sendEmail(emailHtml);

	console.log("sent product of the week");
};

main();
