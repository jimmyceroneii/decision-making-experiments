import { ReadwiseArticle } from "./types";

export const isValidReadwiseArticle = (article: ReadwiseArticle): boolean => {
    return article.tags.length === 0 && !article.reading_progress && article.id !== undefined && article.id.length > 0 && article.word_count > 500 && article.url.length > 0;
}