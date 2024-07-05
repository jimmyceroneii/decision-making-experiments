export type Weighted<T> = T & {
	weight: number;
};

type GenerateWeightParams<T> = {
	list: T[];
	weightFn: (item: T) => number;
};

type WeightedRandomizerParams<T> = {
	weightedList: Weighted<T>[];
};

export const generateWeights = <T>({
	list,
	weightFn,
}: GenerateWeightParams<T>): Weighted<T>[] => {
	const weightedList = list.map((item) => {
		return {
			...item,
			weight: weightFn(item),
		};
	});

	return weightedList;
};

export const sortWeightedList = <T>({
	weightedList,
}: WeightedRandomizerParams<T>): Weighted<T>[] => {
	const listSortedByWeight = weightedList.sort((a, b) => a.weight - b.weight);

	return listSortedByWeight;
};

type RetrieveWeightItemsParams<T> = {
	listSortedByWeight: Weighted<T>[];
};

export const retrieveWeightedItem = <T>({
	listSortedByWeight,
}: RetrieveWeightItemsParams<T>): Weighted<T> | null => {
	const weightSum = listSortedByWeight.reduce((acc, item) => {
		return acc + item.weight;
	}, 0);

	let currentCount = 0;

	const randomNumber = Math.random() * weightSum;

	for (const item of listSortedByWeight) {
		if (item.weight + currentCount > randomNumber) {
			return item;
		} else {
			currentCount += item.weight;
		}
	}

	return null;
};
