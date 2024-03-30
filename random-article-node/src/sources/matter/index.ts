import { shuffleList } from "../../randomizer";
import { getSimilar } from "../../search";
import { isValidArticle } from "./filter";
import { retrieveArticlesAndFormat } from "./processMatterCsv";

type RetrieveMatterArticlesReturnType = {
    matterArticleUrl: string;
    matterArticleTitle: string;
    similarMatterArticles: string[];
}

export const retrieveMatterArticles = async (): Promise<RetrieveMatterArticlesReturnType> => {
    const { articles: matterArticles, errors } = await retrieveArticlesAndFormat();

    console.log('matter articles: ', matterArticles.length);
    console.log('matter errors: ', errors.length);

    const shuffledMatterArticles = shuffleList(matterArticles);

    console.log('filtering matter articles');

    const filteredMatterArticles = shuffledMatterArticles.filter((article) => isValidArticle(article));

    console.log('matter articles left after filter: ', filteredMatterArticles.length);

    const randomMatterArticle = filteredMatterArticles[0];

    console.log(randomMatterArticle)

    console.log('Found random matter article: ', randomMatterArticle.title);

    const matterArticleUrl = 'https://web.getmatter.com/entry/' + randomMatterArticle.id;

    console.log('Finding similar matter articles...')

    const similarMatterArticles = await getSimilar(randomMatterArticle.url);

    return {
        matterArticleUrl,
        matterArticleTitle: randomMatterArticle.title || matterArticleUrl,
        similarMatterArticles
    }
}