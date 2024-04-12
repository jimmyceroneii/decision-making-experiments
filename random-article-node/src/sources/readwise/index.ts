import { shuffleList } from "../../randomizer";
import { getSimilar } from "../../search";
import { fetchDocumentListApi } from "./retrieveReadwiseList";
import { isValidReadwiseArticle } from "./filter";

type RetrieveReadwiseArticlesReturnType = {
    readwiseArticleUrl: string;
    readwiseArticleTitle: string;
    similarReadwiseArticles: string[];
}

export const retrieveReadwiseArticle = async (): Promise<RetrieveReadwiseArticlesReturnType> => {
    const articles = await fetchDocumentListApi();

    console.log('filtering to only valid articles')

    const filteredArticles = articles.filter((data) => isValidReadwiseArticle(data));

    console.log('number of articles after filtering: ', filteredArticles.length);

    const shuffledReadwiseArticles = shuffleList(filteredArticles);

    const randomReadwiseArticle = shuffledReadwiseArticles[0];

    console.log(randomReadwiseArticle)

    console.log('Found random readwise article: ', randomReadwiseArticle.title);

    const readwiseArticleUrl = randomReadwiseArticle.url;
    const readwiseSourceUrl = randomReadwiseArticle.source_url;

    console.log('Finding similar readwise articles...')

    let similarReadwiseArticles: string[] = [];

    if (readwiseSourceUrl) {
        similarReadwiseArticles = await getSimilar(randomReadwiseArticle.source_url);
    }

    return {
        readwiseArticleUrl,
        readwiseArticleTitle: randomReadwiseArticle.title || readwiseArticleUrl,
        similarReadwiseArticles
    }
}
