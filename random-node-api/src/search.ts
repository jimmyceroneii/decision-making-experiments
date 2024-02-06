import Metaphor from 'metaphor-node'

interface ProcessedContents {
  url: string;
  title: string;
}

export const getResultsAndContent = async (query: string) => {
  const metaphor = new Metaphor(process.env.EXA_API_KEY || '')

  const searchResponse = await metaphor.search(query)

  const rawContents = await metaphor.getContents(searchResponse.results)

  const processedContents: ProcessedContents[] = rawContents.contents.map((content) => {
    return {
      url: content.url,
      title: content.title
    }
  })

  return processedContents;
}