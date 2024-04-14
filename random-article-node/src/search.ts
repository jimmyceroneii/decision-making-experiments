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
  const searchResults = await metaphor.search(article.title);

  const rawSearch = await metaphor.getContents(searchResults.results);

  return rawSearch.contents;
}