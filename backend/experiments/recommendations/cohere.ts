import { CohereClient } from "cohere-ai";
import type { EmbedResponse } from "cohere-ai/api";
import * as dotenv from "dotenv";

dotenv.config();

const COHERE_API_TOKEN = process.env.COHERE_API_TOKEN;

const cohere = new CohereClient({
	token: COHERE_API_TOKEN,
});

export const generateEmbeddings = async (
	inputs: string[],
): Promise<EmbedResponse> => {
	const embed = await cohere.embed({
		texts: inputs,
		model: "embed-english-v3.0",
		inputType: "classification",
	});

	return embed;
};
