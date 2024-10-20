import type { ReadwiseArticle } from "./types";

type ArticleWeightFnParams = {
	article: ReadwiseArticle;
	date: Date;
};

export const readwiseArticleWeightFn = ({
	article,
	date,
}: ArticleWeightFnParams): number => {
	const comparisonDate = date.getTime();

	const articleDate = new Date(article.updated_at).getTime();

	return (comparisonDate - articleDate) / (1000 * 60 * 60 * 24);
};
