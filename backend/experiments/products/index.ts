import { retrieveRandomMatterProduct } from "../../backend/sources/matter";
import { retrieveRandomRemindersProduct } from "../../backend/sources/products-reminders-export";
import { retrieveRandomReadwiseProduct } from "../../backend/sources/readwise-reader/retrieveProducts";
import { sendEmail } from "../../utils/send";
import { generateEmail } from "./generate-email";
import { fetchProductInformation } from "./utils";

const main = async () => {
	const remindersProduct = retrieveRandomRemindersProduct();
	const matterProduct = retrieveRandomMatterProduct();
	const readwiseProduct = retrieveRandomReadwiseProduct();

	const { sourceUrls: remindersSources, similar: remindersSimilarProducts } =
		await fetchProductInformation(remindersProduct);

	const { sourceUrls: matterSources, similar: matterSimilarProducts } =
		await fetchProductInformation(matterProduct.url);

	const { sourceUrls: readwiseSources, similar: readwiseSimilarProducts } =
		await fetchProductInformation(
			readwiseProduct.source_url || readwiseProduct.url,
		);

	const emailHtml = generateEmail({
		remindersProduct,
		remindersSources,
		remindersSimilarProducts,
		matterProduct: matterProduct.url,
		matterSources,
		matterSimilarProducts,
		readwiseProduct: readwiseProduct.source_url || readwiseProduct.url,
		readwiseSources,
		readwiseSimilarProducts,
	});

	await sendEmail(emailHtml);

	console.log("sent product of the week");
};

main();
