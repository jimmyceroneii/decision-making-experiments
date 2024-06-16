import { isWeeklyNewsletter } from '../../sources/readwise-reader/filter'
import { fetchDocumentListApi } from '../../sources/readwise-reader/fetch'
import { ReadwiseArticle } from '../../sources/readwise-reader/types'

type RetrieveReadwiseArticlesReturnType = {
  weeklyArticles: ReadwiseArticle[]
}

export const retrieveReadwiseArticle =
  async (): Promise<RetrieveReadwiseArticlesReturnType> => {
    const articles = await fetchDocumentListApi({ writeToFile: false })

    console.log('items before filtering: ', articles.length)

    const filteredArticles: ReadwiseArticle[] = articles.filter((article) =>
      isWeeklyNewsletter(article),
    )

    console.log('found weekly articles: ', filteredArticles.length)

    return {
      weeklyArticles: filteredArticles,
    }
  }
