import { MatterArticle } from './types'

type ArticleWeightFnParams = {
  article: MatterArticle
  date: Date
}

export const matterArticleWeightFn = ({
  article,
  date,
}: ArticleWeightFnParams): number => {
  const comparisonDate = date.getTime()

  const articleDate = new Date(article.lastInteractionDate).getTime()

  return (comparisonDate - articleDate) / (1000 * 60 * 60 * 24)
}
