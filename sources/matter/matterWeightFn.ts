import { MatterArticle } from './types'

type ArticleWeightFnParams = {
  article: MatterArticle
  date: Date
}

export const articleWeightFn = ({ article, date }: ArticleWeightFnParams) => {
  const comparisonDate = date.getTime()

  const articleDate = new Date(article.lastInteractionDate).getTime()

  return comparisonDate - articleDate
}
