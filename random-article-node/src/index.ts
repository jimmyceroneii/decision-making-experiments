import * as fs from 'fs';
import * as path from 'path';

import { shuffleList } from './randomizer';

import { getSimilar } from './search';
import { sendEmail } from './send';

const main = async () => {
  const absolutePath = path.resolve(__dirname, '../..');

  const filePath = path.join(absolutePath, '_matter_history.csv');

  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    const rows: string[] = fileContent.split('\n')

    const articles: string[][] = rows.map((row) => row.split(','))

    // remove headings, probably store these at some point
    articles.shift();

    const shuffledArticles = shuffleList(articles);

    const randomArticle = shuffledArticles[0];

    console.log('Found random article: ', randomArticle[0]);

    const randomArticleId = randomArticle[randomArticle.length - 1].split('.')[0].split('_')[1];

    const matterUrl = 'https://web.getmatter.com/entry/' + randomArticleId;

    const randomArticleString = randomArticle[0] + ": " + matterUrl;

    console.log('Matter URL: ', randomArticleString);

    console.log('Finding similar articles...')

    const similarArticles = await getSimilar(randomArticle[3]);

    const similarArticlesString = '\n\nSimilar:\n\n ' + similarArticles.join('\n');

    console.log('Similar Articles: ', similarArticlesString);

    const emailBody = randomArticleString + similarArticlesString;

    console.log('sending email with daily article...')

    await sendEmail(emailBody);

    console.log('sent article of the day')
  } catch (error) {
    console.error(`Error while sending article of the day: ${error}`)
  }
}

main()