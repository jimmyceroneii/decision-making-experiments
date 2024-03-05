import * as fs from 'fs';
import * as path from 'path';

const main = async () => {
  const DATE_TAG = '2024-02-04';

  const absolutePath = path.resolve(__dirname, '../..');

  const filePath = path.join(absolutePath, '_matter_history.csv');

  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    const rows: string[] = fileContent.split('\n')

    const articles: string[][] = rows.map((row) => row.split(','))

    // remove headings, probably store these at some point
    articles.shift();

    const articlesOfTheWeek = articles.filter((article) => article.includes(DATE_TAG));

    const urlsOfTheWeek = articlesOfTheWeek.map((article) => article.filter((field) => field.includes('.com'))[0]);

    console.log(urlsOfTheWeek);
  } catch (error) {
    console.error(`Error while setting up newsletter: ${error}`)
  }
}

main()