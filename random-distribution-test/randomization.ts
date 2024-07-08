import { retrieveRandomMatterArticle } from "../sources/matter";
import { fetchLocalArticles } from "../sources/matter/processMatterCsv";

type SelectedElements = Record<string, number>;

const matterArticles = fetchLocalArticles();

if (!matterArticles) {
	throw new Error("no local articles found");
}

const randomizationTest = async () => {
	const selected: SelectedElements = {};

	for (let i = 0; i < 10000; i++) {
		const matterArticle = await retrieveRandomMatterArticle(matterArticles);

		const matterArticleUrl = matterArticle.url;

		if (matterArticleUrl in selected) {
			selected[matterArticleUrl] += 1;
		} else {
			selected[matterArticleUrl] = 1;
		}
	}

	console.log("selected: ", JSON.stringify(selected));
};

const main = async () => {
	await randomizationTest();
};

main();
