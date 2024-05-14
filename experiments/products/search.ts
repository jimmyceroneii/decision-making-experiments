import Metaphor from 'metaphor-node'

const metaphor = new Metaphor(process.env.EXA_API_KEY || '')

export const searchForContent = async (query: string) => {
  const searchResponse = await metaphor.search(query)

  const rawContents = await metaphor.getContents(searchResponse.results)

  const processedContents: string[] = rawContents.contents.map((content) => content.url)

  return processedContents;
}

export const getSimilar = async (url: string) => {
  const similarResponse = await metaphor.findSimilar(url, {
    numResults: 10
  });

  const rawSimilar = await metaphor.getContents(similarResponse.results);

  const processedSimilar: string[] = rawSimilar.contents.map((content) => content.url)

  return processedSimilar
}