import * as fs from 'fs';
import * as path from 'path';
import { shuffleList } from './randomizer';

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

    console.log(shuffledArticles[0][0] + ": " + shuffledArticles[0][3]);
  } catch (error) {
    console.error(`Error reading the file: ${error}`)
  }
}

main()