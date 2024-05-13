import Metaphor, { DocumentContent } from 'metaphor-node'
import { ReadwiseArticle } from './sources/readwise/types';

const metaphor = new Metaphor(process.env.EXA_API_KEY || '')

export const getSimilar = async (url: string) => {
  const similarResponse = await metaphor.findSimilar(url, {
    numResults: 10
  });

  const rawSimilar = await metaphor.getContents(similarResponse.results);

  const processedSimilar: string[] = rawSimilar.contents.map((content) => content.url)

  return processedSimilar
}

export const search = async (article: ReadwiseArticle): Promise<DocumentContent[]> => {
  console.log("title: ", article.title)

  const searchResults = await metaphor.search(article.title);

  const rawSearch = await metaphor.getContents(searchResults.results);

  return rawSearch.contents;
}

export const fetchSearch = async (article: ReadwiseArticle): Promise<DocumentContent[]> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': process.env.EXA_API_KEY ?? ''
    },
    body: JSON.stringify({ query: article.title })
  };
  
  const rawSearchResults = await fetch('https://api.exa.ai/search', options);

  const searchResults = await rawSearchResults.json();

  return searchResults.results;
}
