import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { fetchLocalArticles } from "../../sources/matter/processMatterCsv";

dotenv.config();

const PINECONE_API_TOKEN = process.env.PINECONE_API_TOKEN || "";

const pc = new Pinecone({
	apiKey: PINECONE_API_TOKEN,
});

const articles = fetchLocalArticles();

if (!articles) {
	throw new Error("no articles found in local cache");
}

const text = [articles[0].title];

const embeddingModel = "multilingual-e5-large";

const docParameters = {
	inputType: "passage",
	truncate: "END",
};

const main = async () => {
	try {
		const embeddings = await pc.inference.embed(
			embeddingModel,
			text,
			docParameters,
		);

		console.log("embeddings: ", embeddings);
	} catch (e) {
		console.error("error generating embeddings: ", e);
	}
};

main();
