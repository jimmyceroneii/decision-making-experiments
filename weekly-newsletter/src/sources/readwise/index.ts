import { isWeeklyNewsletter } from "./filter";
import { fetchDocumentListApi } from "./retrieveReadwiseList";
import { ReadwiseArticle } from "./types";

type RetrieveReadwiseArticlesReturnType = {
    weeklyArticles: ReadwiseArticle[];
}

const DATE_TAG = '2024-04-04';

export const retrieveReadwiseArticle = async (): Promise<RetrieveReadwiseArticlesReturnType> => {
    const articles = await fetchDocumentListApi();

    console.log('items before filtering: ', articles.length)

    const filteredArticles: ReadwiseArticle[] = articles.filter((article) => isWeeklyNewsletter(article, DATE_TAG));

    console.log('found weekly articles: ', filteredArticles.length);

    return {
        weeklyArticles: filteredArticles,
    }
}
