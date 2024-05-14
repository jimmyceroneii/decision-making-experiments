import { CATEGORIES, ReadwiseArticle } from "./types";

export const isValidReadwiseArticle = (article: ReadwiseArticle): boolean => {
    return isValidCategory(article.category) && (!article.tags || Object.keys(article.tags).length === 0) && !article.reading_progress && article.id !== undefined && article.id.length > 0 && article.word_count > 500 && article.url.length > 0;
}

const isValidCategory = (category: keyof typeof CATEGORIES) => {
    return category == CATEGORIES.article || category == CATEGORIES.email || category == CATEGORIES.pdf || category == CATEGORIES.rss
}