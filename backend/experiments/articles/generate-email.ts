import fs from "node:fs";
import ejs from "ejs";
import type { DocumentContent } from "../../utils/types";
import type { NarrowedArticle } from "../search/types";

type GenerateEmailParams = {
	readwiseArticleUrl: string;
	readwiseArticleTitle: string;
	relatedArticles: DocumentContent[];
	relatedLocalReadwiseArticles: NarrowedArticle[];
	matterArticleUrl: string;
	matterArticleTitle: string;
	similarMatterArticles: string[];
	relatedLocalMatterArticles: NarrowedArticle[];
};

export const generateEmail = ({
	readwiseArticleUrl,
	readwiseArticleTitle,
	relatedArticles,
	relatedLocalReadwiseArticles,
	matterArticleUrl,
	matterArticleTitle,
	similarMatterArticles,
	relatedLocalMatterArticles,
}: GenerateEmailParams) => {
	const templateString = fs.readFileSync(
		"experiments/articles/email-templates/email.ejs",
		"utf-8",
	);

	return ejs.render(templateString, {
		readwiseArticleUrl,
		readwiseArticleTitle,
		relatedArticles,
		relatedLocalReadwiseArticles,
		matterArticleUrl,
		matterArticleTitle,
		similarMatterArticles,
		relatedLocalMatterArticles,
	});
};
