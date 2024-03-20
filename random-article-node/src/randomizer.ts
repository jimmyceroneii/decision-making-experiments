export const shuffleList = <T>(list: T[]): T[] => {
    const listToShuffle = [...list];

    for (let i = listToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listToShuffle[i], listToShuffle[j]] = [listToShuffle[j], listToShuffle[i]];
    }

    return listToShuffle;
};
