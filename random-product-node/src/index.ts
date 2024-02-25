import * as fs from 'fs';
import { shuffleList } from './randomizer';
import { getSimilar, searchForContent } from './search';

const main = async () => {
  const filePath: string = __dirname + '/products.txt'

  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    const lines: string[] = fileContent.split('\n')

    const randomLine = shuffleList(lines)[0]

    const sources = await searchForContent(`Here is some information about the following product: ${randomLine}`);
    const similar = await getSimilar(randomLine);

    console.log(randomLine);
    console.log(sources);
    console.log(similar);
  } catch (error) {
    console.error(`Error reading the file: ${error}`)
  }
}

main()