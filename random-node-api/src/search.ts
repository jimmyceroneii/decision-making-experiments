import Metaphor from 'metaphor-node'

export const getResultsAndContent = async (query: string) => {
  const metaphor = new Metaphor(process.env.EXA_API_KEY || '')

  const searchResponse = await metaphor.search(query)
  const contents = await metaphor.getContents(searchResponse.results)

  return contents.contents
}

console.log(getResultsAndContent('help me find the best articles on ai'));