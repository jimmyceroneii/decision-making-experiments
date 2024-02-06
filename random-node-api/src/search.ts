import Metaphor from 'metaphor-node'

export const getResultsAndContent = async (query: string) => {
  const metaphor = new Metaphor('your_api_key')

  const searchResponse = await metaphor.search(query)
  const contents = await metaphor.getContents(searchResponse.results)

  return contents.contents
}
