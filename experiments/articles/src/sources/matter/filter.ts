import { MatterArticle } from "./types";

export const isValidMatterArticle = (article: MatterArticle): boolean => {
    return article.inQueue && !article.read && article.id !== undefined && article.id.length > 0 && article.wordCount > 500 && article.url.length > 0;
}