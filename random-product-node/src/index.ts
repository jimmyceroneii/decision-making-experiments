import * as fs from 'fs'
import { shuffleList } from './randomizer'
import { getResultsAndContent } from './search';

const main = async () => {
  const filePath: string = __dirname + '/products.txt'

  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    const lines: string[] = fileContent.split('\n')

    const randomLine = shuffleList(lines)[0]

    const sources = await getResultsAndContent(`Find information about the following product: ${randomLine}`)

    console.log(randomLine)
    console.log(sources);
  } catch (error) {
    console.error(`Error reading the file: ${error}`)
  }
}

main()