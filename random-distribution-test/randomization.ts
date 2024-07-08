import { retrieveRandomMatterArticle } from "../sources/matter";

type SelectedElements = Record<string, number>;

const randomizationTest = async () => {
	const selected: SelectedElements = {};

	for (let i = 0; i < 100; i++) {
		const matterArticle = await retrieveRandomMatterArticle();

		const matterArticleTitle = matterArticle.title || matterArticle.url;

		if (matterArticleTitle in selected) {
			selected[matterArticleTitle] += 1;
		} else {
			selected[matterArticleTitle] = 1;
		}
	}

	console.log("selected: ", JSON.stringify(selected));
};

const main = async () => {
	await randomizationTest();
};

main();
