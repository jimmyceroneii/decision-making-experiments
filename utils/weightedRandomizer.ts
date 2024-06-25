type Weighted<T> = T & {
  weight: number
}

type GenerateWeightParams<T> = {
  list: T[]
  weightFn: (item: T) => number
}

type WeightedRandomizerParams<T> = {
  list: T[]
  weightFn: (item: T) => number
}

const generateWeights = <T>({
  list,
  weightFn,
}: GenerateWeightParams<T>): Weighted<T>[] => {
  const weightedList = list.map((item) => {
    return {
      ...item,
      weight: weightFn(item),
    }
  })

  return weightedList
}

export const weightedRandomizer = <T>({
  list,
  weightFn,
}: WeightedRandomizerParams<T>): Weighted<T> | null => {
  const weightedList = generateWeights({ list, weightFn })

  const weightSum = weightedList.reduce((acc, item) => {
    return acc + item.weight
  }, 0)

  const randomNumber = Math.random() * weightSum

  const listSortedByWeight = weightedList.sort((a, b) => a.weight - b.weight)

  let currentCount = 0

  for (const item of listSortedByWeight) {
    if (currentCount + randomNumber < item.weight) {
      return item
    } else {
      currentCount += item.weight
    }
  }

  return null
}
