import { shuffleList } from "../../randomizer";
import { getSimilar } from "../../search";
import { fetchDocumentListApi } from "./retrieveReadwiseList";

type RetrieveReadwiseArticlesReturnType = {
    readwiseArticleUrl: string;
    readwiseArticleTitle: string;
    similarReadwiseArticles: string[];
}

export const retrieveReadwiseArticle = async (): Promise<RetrieveReadwiseArticlesReturnType> => {
    const articles = await fetchDocumentListApi();

    console.log('readwise articles: ', articles.length);

    const shuffledReadwiseArticles = shuffleList(articles);

    const randomReadwiseArticle = shuffledReadwiseArticles[0];

    console.log(randomReadwiseArticle)

    console.log('Found random readwise article: ', randomReadwiseArticle.title);

    const readwiseArticleUrl = randomReadwiseArticle.url;

    console.log('Finding similar readwise articles...')

    const similarReadwiseArticles = await getSimilar(randomReadwiseArticle.source_url);

    return {
        readwiseArticleUrl,
        readwiseArticleTitle: randomReadwiseArticle.title || readwiseArticleUrl,
        similarReadwiseArticles
    }
}
