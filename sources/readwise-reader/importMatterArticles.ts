import * as dotenv from 'dotenv'
dotenv.config()

const token = process.env.READWISE_API_TOKEN || ''

type ImportMatterArticleToReadwiseParams = {
  url: string
  html?: string
  should_clean_html?: boolean
  title?: string
  author?: string
  summary?: string
  published_date?: string
  image_url?: string
  location?: string
  category?: string
  saved_using?: string
  tags?: string[]
  notes?: string
}

export const importMatterArticleToReadwise = async (
  params: ImportMatterArticleToReadwiseParams,
): Promise<void> => {
  const body = JSON.stringify(params)

  // defaults to inbox which is good.
  // defaults to no title or other meta data which is bad
  // rate limit is 20 / minute
  const response = await fetch('https://readwise.io/api/v3/save/', {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  })

  console.log(JSON.stringify(response.status))
}

const main = async () => {
  await importMatterArticleToReadwise({
    url: 'https://www.platformer.news/meta-unspools-threads/',
  })
}

main()
