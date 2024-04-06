import Chance from 'chance';
import { MatterArticle } from '../sources/matter/types';
import { ReadwiseArticle } from '../sources/readwise/types';

const chance = new Chance();

type MakeOptional<T> = {
    [K in keyof T]?: T[K];
}

type GenerateMatterTestArticleParams = MakeOptional<MatterArticle>;

export const generateMatterTestArticle = (params: GenerateMatterTestArticleParams): MatterArticle => {
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

type GenerateReadwiseArticleParams = MakeOptional<ReadwiseArticle>;

export const generateReadwiseTestArticle = (params: GenerateReadwiseArticleParams): ReadwiseArticle => {
    return {
        id: chance.string({ length: 10 }),
        url: chance.string({ length: 10 }),
        title: chance.string({ length: 10 }),
        author: chance.string({ length: 10 }),
        source: chance.string({ length: 10 }),
        category: chance.string({ length: 10 }),
        location: chance.string({ length: 10 }),
        tags: [],
        site_name: chance.string({ length: 10 }),
        word_count: chance.integer({ min: 1, max: 10000 }),
        created_at: chance.string({ length: 10 }),
        updated_at: chance.string({ length: 10 }),
        published_date: chance.integer({ min: 1, max: 10000 }),
        summary: "test",
        image_url: chance.string({ length: 10 }),
        content: "test",
        source_url: chance.string({ length: 10 }),
        notes: chance.string({ length: 10 }),
        parent_id: chance.integer({ min: 1, max: 10000 }),
        reading_progress: chance.integer({ min: 1, max: 10000 }),
        ...params
    }
}