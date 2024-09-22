import * as dotenv from "dotenv";
import { processOneTab } from "../../sources/one-tab";
import { sendUploadRequestWithRetry } from "../../utils/retry";
dotenv.config();

const token = process.env.READWISE_API_TOKEN || "";

type BulkUploadReadwiseArticlesParams = {
	urls: string[];
	tag: string;
};

type UploadResponse = {
	id: string;
	url: string;
};

const bulkUploadReadwiseArticles = async ({
	urls,
	tag,
}: BulkUploadReadwiseArticlesParams) => {
	for (const url of urls) {
		const response = await sendUploadRequestWithRetry(url, tag);
		console.log(response);
	}
};

const uploadOneTabUrls = () => {
	const urls = processOneTab();

	const tag = "frank-sinatra-deep-dive";

	bulkUploadReadwiseArticles({ urls, tag });
};

uploadOneTabUrls();
