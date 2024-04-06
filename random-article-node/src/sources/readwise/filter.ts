import { CATEGORIES, ReadwiseArticle } from "./types";

export const isValidReadwiseArticle = (article: ReadwiseArticle): boolean => {
    return article.category === CATEGORIES.article && (!article.tags || Object.keys(article.tags).length === 0) && !article.reading_progress && article.id !== undefined && article.id.length > 0 && article.word_count > 500 && article.url.length > 0;
}