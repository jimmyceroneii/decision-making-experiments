import Metaphor, { DocumentContent } from 'metaphor-node'

const metaphor = new Metaphor(process.env.EXA_API_KEY || '')

export const getSimilar = async (url: string) => {
  const similarResponse = await metaphor.findSimilar(url, {
    numResults: 10
  });

  const rawSimilar = await metaphor.getContents(similarResponse.results);

  const processedSimilar: string[] = rawSimilar.contents.map((content) => content.url)

  return processedSimilar
}


export const fetchSearch = async (searchTerm: string): Promise<DocumentContent[]> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': process.env.EXA_API_KEY ?? ''
    },
    body: JSON.stringify({ query: searchTerm })
  };
  
  const rawSearchResults = await fetch('https://api.exa.ai/search', options);

  const searchResults = await rawSearchResults.json();

  return searchResults.results;
}
