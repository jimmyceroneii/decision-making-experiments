import { generateEmbeddings } from "./cohere";
import { upsertToPinecone } from "./pinecone";

const main = async () => {
	// TODO: import articles here

	// generate embeddings
	const embeddings = generateEmbeddings([]);

	// TODO: Map embeddings to articles for metadata in pinecone

	// upload embeddings to pinecone
	// TODO: chunk to max of 100 at a time
	const upserts = upsertToPinecone([]);
};
