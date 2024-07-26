import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";

dotenv.config();

const PINECONE_API_TOKEN = process.env.PINECONE_API_TOKEN || "";

const pc = new Pinecone({
	apiKey: PINECONE_API_TOKEN,
});
