import Metaphor from 'metaphor-node'
import * as dotenv from 'dotenv'
dotenv.config()

const metaphor = new Metaphor(process.env.EXA_API_KEY || '')

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
