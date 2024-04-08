import { fetchDocumentListApi } from "../src/sources/readwise/retrieveReadwiseList"
import { isWeeklyNewsletter } from "./sources/readwise/filter";
import { ReadwiseArticle } from "./sources/readwise/types";

const main = async () => {
  const DATE_TAG = '2024-04-04';

  try {
    const articles: ReadwiseArticle[] = await fetchDocumentListApi();

    console.log('found total articles: ', articles.length);

    const weeklyArticles = articles.filter((article) => isWeeklyNewsletter(article, DATE_TAG));

    console.log('found weekly articles: ', weeklyArticles.length);

    console.log(weeklyArticles.map((article) => article.title))
  } catch (error) {
    console.error(`Error while setting up newsletter: ${error}`)
  }
}

main()