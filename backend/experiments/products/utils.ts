import { fetchSearch, fetchSimilar } from "../../utils/exa";

type FetchProductInformationResponse = {
	sourceUrls: string[];
	similar: string[];
};

export const fetchProductInformation = async (
	product: string,
): Promise<FetchProductInformationResponse> => {
	console.log("Product: ", product);

	console.log("Finding news stories...");

	const sources = await fetchSearch(
		`Here is some information about the following product: ${product}`,
	);

	const sourceUrls = sources.map((source) => source.url);

	console.log("Sources: ", sourceUrls);

	console.log("Finding similar products...");

	const similar = await fetchSimilar(product);

	console.log("Similar: ", similar);

	return {
		sourceUrls,
		similar,
	};
};
