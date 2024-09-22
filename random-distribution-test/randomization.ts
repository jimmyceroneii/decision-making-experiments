import { retrieveRandomMatterArticle } from "../sources/matter";
import { fetchLocalMatterArticles } from "../sources/matter/processMatterCsv";

type SelectedElements = Record<string, number>;

const matterArticles = fetchLocalMatterArticles();

if (!matterArticles) {
	throw new Error("no local articles found");
}

const randomizationTest = async () => {
	const selected: SelectedElements = {};

	for (let i = 0; i < 1000; i++) {
		const matterArticle = await retrieveRandomMatterArticle(matterArticles);

		const matterArticleUrl = matterArticle.url;

		if (matterArticleUrl in selected) {
			selected[matterArticleUrl] += 1;
		} else {
			selected[matterArticleUrl] = 1;
		}
	}

	const selectedArray = Object.entries(selected);

	const sortedSelection = selectedArray.sort((a, b) => b[1] - a[1]);

	for (const selection of sortedSelection) {
		console.log(`${selection[0]}: ${selection[1]}`);
	}
};

const main = async () => {
	await randomizationTest();
};

main();
