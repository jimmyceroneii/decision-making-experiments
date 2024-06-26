import { shuffleList } from '../../utils/randomizer'
import { fetchSimilar } from '../../utils/search'
import { isValidMatterArticle } from './filter'
import { retrieveArticlesAndFormat } from './processMatterCsv'

type RetrieveMatterArticlesReturnType = {
  matterArticleUrl: string
  matterArticleTitle: string
  similarMatterArticles: string[]
}

export const retrieveWeightedMatterArticles =
  async (): Promise<RetrieveMatterArticlesReturnType> => {
    const { articles: matterArticles, errors } =
      await retrieveArticlesAndFormat()

    console.log('matter articles: ', matterArticles.length)
    console.log('matter errors: ', errors.length)

    const weightedRandomArticle = null
  }

export const retrieveMatterArticles =
  async (): Promise<RetrieveMatterArticlesReturnType> => {
    const { articles: matterArticles, errors } =
      await retrieveArticlesAndFormat()

    console.log('matter articles: ', matterArticles.length)
    console.log('matter errors: ', errors.length)

    const shuffledMatterArticles = shuffleList(matterArticles)

    console.log('filtering matter articles')

    const filteredMatterArticles = shuffledMatterArticles.filter((article) =>
      isValidMatterArticle(article),
    )

    console.log(
      'matter articles left after filter: ',
      filteredMatterArticles.length,
    )

    const randomMatterArticle = filteredMatterArticles[0]

    console.log(randomMatterArticle)

    console.log('Found random matter article: ', randomMatterArticle.title)

    console.log('Finding similar matter articles...')

    const similarMatterArticles = await fetchSimilar(randomMatterArticle.url)

    return {
      matterArticleUrl: randomMatterArticle.url,
      matterArticleTitle: randomMatterArticle.title || randomMatterArticle.url,
      similarMatterArticles,
    }
  }
