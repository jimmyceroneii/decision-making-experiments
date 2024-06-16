import { sendRequestWithRetry } from '../../utils/retry'
import { writeArrayToFile } from '../../utils/writeFile'
import { ReadwiseArticle } from './types'

type FetchDocumentListApiParams = {
  writeToFile: boolean
}

export const fetchDocumentListApi = async ({
  writeToFile = false,
}: FetchDocumentListApiParams) => {
  let fullData: ReadwiseArticle[] = []
  let nextPageCursor = null

  while (true) {
    const queryParams = new URLSearchParams()
    if (nextPageCursor) {
      queryParams.append('pageCursor', nextPageCursor)
    }
    console.log(
      'Making export api request with params ' + queryParams.toString(),
    )
    const response = await sendRequestWithRetry<{
      results: ReadwiseArticle[]
      nextPageCursor: string
    }>('https://readwise.io/api/v3/list/?' + queryParams.toString())
    fullData.push(...response['results'])
    nextPageCursor = response['nextPageCursor']
    if (!nextPageCursor) {
      break
    }
  }

  console.log('items before filtering: ', fullData.length)

  if (writeToFile) {
    console.log('writing to file')

    writeArrayToFile<ReadwiseArticle>({
      filePath: 'sources/readwise-reader/backup.json',
      array: fullData,
    })
  }

  return fullData
}
