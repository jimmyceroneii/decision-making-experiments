import { ReadwiseArticle } from "./types";

export const isWeeklyNewsletter = (article: ReadwiseArticle, week: string): boolean => {
    // if there are no tags this is not it
    if (!article.tags) return false;

    // if the week is not in the tags, not valid
    let isWeekTag = false;

    for (const tag of Object.keys(article.tags)) {
        if (tag === week) {
            isWeekTag = true;
        }
    }

    if (!isWeekTag) return false;

    // if there is no id or url, we are in trouble
    return article.id !== undefined && article.id.length > 0 && article.url.length > 0 && article.title !== undefined && article.title.length > 0;
}