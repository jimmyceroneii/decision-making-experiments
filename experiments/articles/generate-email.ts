import fs from 'fs'
import ejs from 'ejs'
import { DocumentContent } from '../../utils/types'

type GenerateEmailParams = {
  readwiseArticleUrl: string
  readwiseArticleTitle: string
  relatedArticles: DocumentContent[]
  matterArticleUrl: string
  matterArticleTitle: string
  similarMatterArticles: string[]
}

export const generateEmail = ({
  readwiseArticleUrl,
  readwiseArticleTitle,
  relatedArticles,
  matterArticleUrl,
  matterArticleTitle,
  similarMatterArticles,
}: GenerateEmailParams) => {
  const templateString = fs.readFileSync(
    'experiments/articles/email-templates/email.ejs',
    'utf-8',
  )

  return ejs.render(templateString, {
    readwiseArticleUrl,
    readwiseArticleTitle,
    relatedArticles,
    matterArticleUrl,
    matterArticleTitle,
    similarMatterArticles,
  })
}
