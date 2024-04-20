import { isWeeklyNewsletter } from "./filter";
import { fetchDocumentListApi } from "./retrieveReadwiseList";
import { ReadwiseArticle } from "./types";

type RetrieveReadwiseArticlesReturnType = {
    weeklyArticles: ReadwiseArticle[];
}

const getDateTag = () => {
    const date = new Date();

    const year = date.getFullYear();

    const month = date.getMonth() + 1;

    const day = date.getDate();

    return `${year}-${month}-${day}`
}

export const retrieveReadwiseArticle = async (): Promise<RetrieveReadwiseArticlesReturnType> => {
    const dateTag = getDateTag();

    const articles = await fetchDocumentListApi();

    console.log('items before filtering: ', articles.length)

    const filteredArticles: ReadwiseArticle[] = articles.filter((article) => isWeeklyNewsletter(article, dateTag));

    console.log('found weekly articles: ', filteredArticles.length);

    return {
        weeklyArticles: filteredArticles,
    }
}
