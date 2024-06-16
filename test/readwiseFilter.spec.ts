import { isValidReadwiseArticle } from '../sources/readwise-reader/filter'
import { CATEGORIES, ReadwiseArticle } from '../sources/readwise-reader/types'
import { generateReadwiseTestArticle } from './helper'

describe('filter', () => {
  it('filters out non-articles', () => {
    const articleList: ReadwiseArticle[] = []

    for (let i = 0; i < 20; i++) {
      const category = i % 2 === 0 ? CATEGORIES.article : CATEGORIES.note

      articleList.push(generateReadwiseTestArticle({ category }))
    }

    const filteredList = articleList.filter((article) =>
      isValidReadwiseArticle(article),
    )

    expect(filteredList.length).toEqual(10)
  })

  it('filters out articles with reading progress', () => {
    const articleList: ReadwiseArticle[] = []

    for (let i = 0; i < 20; i++) {
      const reading_progress = i % 2 === 0 ? 50 : 0

      articleList.push(generateReadwiseTestArticle({ reading_progress }))
    }

    const filteredList = articleList.filter((article) =>
      isValidReadwiseArticle(article),
    )

    expect(filteredList.length).toEqual(10)
  })

  it('filters out articles with tags', () => {
    const articleList: ReadwiseArticle[] = []

    for (let i = 0; i < 20; i++) {
      const tags =
        i % 2 === 0
          ? {}
          : { books: { name: 'products', type: 'manual', created: 10000 } }

      articleList.push(generateReadwiseTestArticle({ tags }))
    }

    const filteredList = articleList.filter((article) =>
      isValidReadwiseArticle(article),
    )

    expect(filteredList.length).toEqual(10)
  })

  it('filters out articles with less than 500 words', () => {
    const articleList: ReadwiseArticle[] = []

    for (let i = 0; i < 20; i++) {
      const word_count = i % 2 === 0 ? 1500 : 200

      articleList.push(generateReadwiseTestArticle({ word_count }))
    }

    const filteredList = articleList.filter((article) =>
      isValidReadwiseArticle(article),
    )

    expect(filteredList.length).toEqual(10)
  })

  it('filters out articles without an id', () => {
    const articleList: ReadwiseArticle[] = []

    for (let i = 0; i < 20; i++) {
      const id = i % 2 === 0 ? undefined : 'test'

      articleList.push(generateReadwiseTestArticle({ id }))
    }

    for (let i = 0; i < 20; i++) {
      const id = i % 2 === 0 ? '' : 'test'

      articleList.push(generateReadwiseTestArticle({ id }))
    }

    const filteredList = articleList.filter((article) =>
      isValidReadwiseArticle(article),
    )

    expect(filteredList.length).toEqual(20)
  })

  it('filters out articles without a url', () => {
    const articleList: ReadwiseArticle[] = []

    for (let i = 0; i < 20; i++) {
      const url = i % 2 === 0 ? '' : 'test'

      articleList.push(generateReadwiseTestArticle({ url }))
    }

    const filteredList = articleList.filter((article) =>
      isValidReadwiseArticle(article),
    )

    expect(filteredList.length).toEqual(10)
  })
})
