import { fetchDocumentListApi } from './fetch'

const main = async () => {
  try {
    const articles = await fetchDocumentListApi({ writeToFile: true })

    console.log('found articles: ', articles.length)
  } catch (e) {
    console.log('error with weekly sync')
    console.log('error: ', e)
  }
}

main()