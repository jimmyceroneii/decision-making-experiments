import { isWeeklyNewsletter } from "./filter";
import { fetchDocumentListApi } from "./retrieveReadwiseList";
import { ReadwiseArticle } from "./types";

type RetrieveReadwiseArticlesReturnType = {
    weeklyArticles: ReadwiseArticle[];
}

export const retrieveReadwiseArticle = async (): Promise<RetrieveReadwiseArticlesReturnType> => {
    const articles = await fetchDocumentListApi();

    const filteredArticles: ReadwiseArticle[] = articles.filter((article) => isWeeklyNewsletter(article, '2023-12-1'));

    return {
        weeklyArticles: filteredArticles,
    }
}
