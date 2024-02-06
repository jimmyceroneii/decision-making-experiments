import express, { Request, Response } from 'express'
import * as fs from 'fs'
import { shuffleList } from './randomizer'
import { getResultsAndContent } from './search';

const app = express()
const PORT = 3000

app.get('/product/random', async (req: Request, res: Response) => {
  const filePath: string = __dirname + '/products.txt'

  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    const lines: string[] = fileContent.split('\n')

    const randomLine = shuffleList(lines)[0]

    const sources = await getResultsAndContent(`Find information about the following product: ${randomLine}`)

    res.send(`<div><h2>${randomLine}</h2><p>${JSON.stringify(sources)}</p></div>`)
  } catch (error) {
    console.error(`Error reading the file: ${error}`)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
