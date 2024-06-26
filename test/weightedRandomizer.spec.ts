import { MatterArticle } from '../sources/matter/types'
import {
  generateWeights,
  retrieveWeightedItems,
  sortWeightedList,
} from '../utils/weightedRandomizer'
import { generateMatterTestArticle } from './helper'

describe('utils/weightedRandomizer', () => {
  const example: MatterArticle[] = [
    generateMatterTestArticle({ lastInteractionDate: '2023-11-01' }),
    generateMatterTestArticle({ lastInteractionDate: '2022-12-05' }),
    generateMatterTestArticle({ lastInteractionDate: '2023-05-05' }),
  ]

  const weightFn = (article: MatterArticle) => {
    return new Date(article.lastInteractionDate).getTime()
  }

  describe('generateWeights', () => {
    it('takes a list and adds weights based on a weight function', () => {
      const weightedList = generateWeights({ list: example, weightFn })

      expect(weightedList.length).toEqual(3)

      for (const item of weightedList) {
        expect(item.weight).toBeDefined()
      }
    })
  })

  describe('sortWeightedList', () => {
    it('returns a sorted list', () => {
      const weightedList = generateWeights({ list: example, weightFn })

      const sortedList = sortWeightedList<MatterArticle>({ weightedList })

      expect(sortedList.length).toEqual(3)

      expect(sortedList[0].lastInteractionDate).toEqual('2022-12-05')
      expect(sortedList[0].weight).toEqual(1670198400000)

      expect(sortedList[1].lastInteractionDate).toEqual('2023-05-05')
      expect(sortedList[1].weight).toEqual(1683244800000)

      expect(sortedList[2].lastInteractionDate).toEqual('2023-11-01')
      expect(sortedList[2].weight).toEqual(1698796800000)
    })
  })

  describe('retrieveWeightedItems', () => {
    it('returns a sorted list of specified length', () => {
      const weightedList = generateWeights({ list: example, weightFn })

      const sortedList = sortWeightedList<MatterArticle>({ weightedList })

      const setOfWeightedItems = retrieveWeightedItems({
        listSortedByWeight: sortedList,
      })

      expect(setOfWeightedItems).toHaveLength(2)
    })
  })
})
