import Metaphor from 'metaphor-node'
import * as dotenv from 'dotenv'
dotenv.config()

const metaphor = new Metaphor(process.env.EXA_API_KEY || '')

export const searchForContent = async (query: string) => {
  console.log('👍 1')

  const searchResponse = await metaphor.search(query)

  console.log('👍 2: ', JSON.stringify(searchResponse.results))

  const rawContents = await metaphor.getContents(searchResponse.results)

  console.log('👍 3')

  const processedContents: string[] = rawContents.contents.map(
    (content) => content.url,
  )

  console.log('👍 4')

  return processedContents
}

export const getSimilar = async (url: string) => {
  const similarResponse = await metaphor.findSimilar(url, {
    numResults: 10,
  })

  const rawSimilar = await metaphor.getContents(similarResponse.results)

  const processedSimilar: string[] = rawSimilar.contents.map(
    (content) => content.url,
  )

  return processedSimilar
}
