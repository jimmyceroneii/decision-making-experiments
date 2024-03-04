import * as fs from 'fs';
import { shuffleList } from './randomizer';
import { getSimilar, searchForContent } from './search';
import { generateEmail, sendEmail } from './send';

const main = async () => {
  const filePath: string = 'src/products.txt'

  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    const products: string[] = fileContent.split('\n')

    const randomProduct = shuffleList(products)[0];

    console.log('Product: ', randomProduct);

    const sources = await searchForContent(`Here is some information about the following product: ${randomProduct}`);

    console.log('Sources: ', sources);

    const similar = await getSimilar(randomProduct);
    
    console.log('Similar: ', similar);
    
    const emailHtml = generateEmail(randomProduct, sources, similar);

    await sendEmail(emailHtml);

    console.log('sent product of the week')
  } catch (error) {
    console.error(`Error with the product of the week: ${error}`)
  }
}

main()