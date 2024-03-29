import Chance from 'chance';
import { Article } from '../sources/matter/types';

const chance = new Chance();

type MakeOptional<T> = {
    [K in keyof T]?: T[K];
}

type GenerateTestArticleParams = MakeOptional<Article>;

export const generateTestArticle = (params: GenerateTestArticleParams): Article => {
    return {
        id: chance.string({ length: 10 }),
        title: chance.string({ length: 10 }),
        author: chance.string({ length: 10 }),
        publisher: chance.string({ length: 10 }),
        url: chance.string({ length: 10 }),
        tags: chance.string({ length: 10 }),
        wordCount: chance.integer({ min: 1, max: 10000 }),
        inQueue: chance.bool(),
        favorited: chance.bool(),
        read: chance.bool(),
        highlightCount: chance.integer({ min: 1, max: 10000 }),
        lastInteractionDate: chance.string({ length: 10 }),
        ...params
    }
}
