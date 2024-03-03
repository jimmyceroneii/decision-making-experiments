import * as fs from 'fs';
import { shuffleList } from './randomizer';
import { getSimilar, searchForContent } from './search';

const main = async () => {
  const filePath: string = 'src/products.txt'

  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    const products: string[] = fileContent.split('\n')

    const randomProduct = shuffleList(products)[0];

    console.log(randomProduct);

    const sources = await searchForContent(`Here is some information about the following product: ${randomProduct}`);
    const similar = await getSimilar(randomProduct);
    
    console.log(sources);
    console.log(similar);
  } catch (error) {
    console.error(`Error reading the file: ${error}`)
  }
}

main()