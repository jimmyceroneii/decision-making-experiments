import { weightedRandomizer } from '../utils/weightedRandomizer'

describe('weightedRandomizer', () => {
  it('retrieves a single item from a list', () => {
    type ExampleType = {
      title: string
      date: number
    }

    const example: ExampleType[] = [
      { title: 'thing', date: 1 },
      { title: 'thing2', date: 5 },
    ]

    const test = weightedRandomizer({
      list: example,
      weightFn: (item: ExampleType) => 2 * item.date,
    })

    expect(test).toBeDefined()
  })
})
