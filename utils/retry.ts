const MAX_RETRIES = 100;
import * as dotenv from "dotenv";
dotenv.config();

const INITIAL_BACKOFF = 60010; // in milliseconds

const token = process.env.READWISE_API_TOKEN || "";

export const sendRequestWithRetry = async <T>(
	url: string,
	retries = 0,
): Promise<T> => {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		const data = await response.json();

		if ("detail" in data && data.detail.includes("throttled")) {
			throw new Error(`throttled on retry #${retries}...`);
		}

		return data;
	} catch (error) {
		console.log("backing off to retry...", error);
		if (retries < MAX_RETRIES) {
			await new Promise((resolve) => setTimeout(resolve, INITIAL_BACKOFF));
			return sendRequestWithRetry(url, retries + 1);
		}

		throw new Error(`Max retries reached (${MAX_RETRIES})`);
	}
};
