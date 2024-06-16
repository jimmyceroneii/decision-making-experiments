import { writeArrayToFile } from '../../utils/writeFile'
import { fetchDocumentListApi } from './fetch'
import { ReadwiseArticle } from './types'

const main = async () => {
  try {
    const articles = await fetchDocumentListApi()

    console.log('found articles: ', articles.length)

    writeArrayToFile<ReadwiseArticle>({
      filePath: 'sources/readwise-reader/backup.json',
      array: articles,
    })
  } catch (e) {
    console.log('error with weekly sync')
    console.log('error: ', e)
  }
}

main()
