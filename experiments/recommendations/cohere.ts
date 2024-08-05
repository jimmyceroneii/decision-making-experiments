import { CohereClient } from "cohere-ai";
import * as dotenv from "dotenv";

import { fetchLocalArticles } from "../../sources/matter/processMatterCsv";

dotenv.config();

const COHERE_API_TOKEN = process.env.COHERE_API_TOKEN;

const cohere = new CohereClient({
	token: COHERE_API_TOKEN,
});

const articles = fetchLocalArticles();

if (!articles) {
	throw new Error("no articles found in local cache");
}

const text = [articles[0].title];

(async () => {
	const embed = await cohere.embed({
		texts: text,
		model: "embed-english-v3.0",
		inputType: "classification",
	});
	console.log(embed);
})();
