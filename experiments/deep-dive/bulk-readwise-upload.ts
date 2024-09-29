import * as dotenv from "dotenv";
import { processOneTab } from "../../sources/one-tab";
import { sendUploadRequestWithRetry } from "../../utils/retry";
dotenv.config();

const token = process.env.READWISE_API_TOKEN || "";

type BulkUploadReadwiseArticlesParams = {
	urls: string[];
	tag: string | null;
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

	const tag = "mens-groups";

	bulkUploadReadwiseArticles({ urls, tag });
};

uploadOneTabUrls();
