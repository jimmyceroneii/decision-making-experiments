const list = [1, 2, 3, 4];

const shuffleList = <T>(list: T[]): T[] => {
    const listToShuffle = [...list];

    for (let i = listToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listToShuffle[i], listToShuffle[j]] = [listToShuffle[j], listToShuffle[i]];
    }

    return listToShuffle;
}

const shuffledList = shuffleList<number>(list);

console.log('before: ', list);
console.log('after: ', shuffledList);