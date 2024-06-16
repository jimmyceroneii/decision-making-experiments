import { fetchLocalArticles } from '../../sources/readwise-reader/fetch'
import { isValidReadwiseArticle } from '../../sources/readwise-reader/filter'
import { shuffleList } from '../../utils/randomizer'
import { fetchSearch } from '../../utils/search'
import { DocumentContent } from '../../utils/types'

type RetrieveReadwiseArticlesReturnType = {
  readwiseArticleUrl: string
  readwiseArticleTitle: string
  relatedArticles: DocumentContent[]
}

export const retrieveReadwiseArticle =
  async (): Promise<RetrieveReadwiseArticlesReturnType> => {
    const articles = fetchLocalArticles()

    if (!articles) {
      throw new Error('no articles found in json backup')
    }

    console.log('filtering to only valid articles')

    const filteredArticles = articles.filter((data) =>
      isValidReadwiseArticle(data),
    )

    console.log('number of articles after filtering: ', filteredArticles.length)

    const shuffledReadwiseArticles = shuffleList(filteredArticles)

    const randomReadwiseArticle = shuffledReadwiseArticles[0]

    console.log(randomReadwiseArticle)

    console.log('Found random readwise article: ', randomReadwiseArticle.title)

    const readwiseArticleUrl = randomReadwiseArticle.url

    console.log('Finding related articles...')

    const relatedArticles = await fetchSearch(randomReadwiseArticle.title)

    return {
      readwiseArticleUrl,
      readwiseArticleTitle: randomReadwiseArticle.title || readwiseArticleUrl,
      relatedArticles,
    }
  }
