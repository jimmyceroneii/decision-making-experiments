import { CATEGORIES, type ReadwiseArticle } from "./types";

export const isWeeklyNewsletter = (article: ReadwiseArticle): boolean => {
	// if there are no tags this is not it
	if (!article.tags) return false;

	// if the week is not in the tags, not valid
	let isWeekTag = false;

	for (const tag of Object.keys(article.tags)) {
		if (tag === "newsletter") {
			isWeekTag = true;
		}
	}

	if (!isWeekTag) return false;

	// if there is no id or url, we are in trouble
	return (
		article.id !== undefined &&
		article.id.length > 0 &&
		article.url.length > 0 &&
		article.title !== undefined &&
		article.title.length > 0
	);
};

export const isValidReadwiseArticle = (article: ReadwiseArticle): boolean => {
	return (
		isValidCategory(article.category) &&
		(!article.tags || Object.keys(article.tags).length === 0) &&
		!article.reading_progress &&
		article.id !== undefined &&
		article.id.length > 0 &&
		article.word_count > 500 &&
		article.url.length > 0
	);
};

const isValidCategory = (category: keyof typeof CATEGORIES) => {
	return (
		category == CATEGORIES.article ||
		category == CATEGORIES.email ||
		category == CATEGORIES.pdf ||
		category == CATEGORIES.rss
	);
};
