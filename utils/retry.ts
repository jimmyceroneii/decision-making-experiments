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

type UploadResponse = {
	id: string;
	url: string;
};

export const sendUploadRequestWithRetry = async <T>(
	url: string,
	tag: string,
	retries = 0,
): Promise<UploadResponse> => {
	try {
		const response = await fetch("https://readwise.io/api/v3/save/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({
				url,
				tags: [tag],
			}),
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
			return sendUploadRequestWithRetry(url, tag, retries + 1);
		}

		throw new Error(`Max retries reached (${MAX_RETRIES})`);
	}
};
