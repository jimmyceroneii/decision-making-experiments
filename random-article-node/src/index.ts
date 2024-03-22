import { shuffleList } from './randomizer';

import { getSimilar } from './search';
import { generateEmail, sendEmail } from './send';
import { retrieveArticlesAndFomat } from './processCsv';

const main = async () => {
  try {
    const { articles, errors } = await retrieveArticlesAndFomat();

    console.log('articles: ', articles.length);
    console.log('errors: ', errors.length);

    const shuffledArticles = shuffleList(articles);

    const randomArticle = shuffledArticles[0];

    console.log('Found random article: ', randomArticle.title);

    const matterUrl = 'https://web.getmatter.com/entry/' + randomArticle.id;

    console.log('Finding similar articles...')

    const similarArticles = await getSimilar(randomArticle.url);

    const emailHtml = generateEmail(matterUrl, similarArticles);

    console.log('sending email with daily article...')

    await sendEmail(emailHtml);

    console.log('sent article of the day')
  } catch (error) {
    console.error(`Error while sending article of the day: ${error}`)
  }
}

main()