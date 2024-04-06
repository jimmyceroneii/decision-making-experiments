import { isValidReadwiseArticle } from "../sources/readwise/filter";
import { ReadwiseArticle } from "../sources/readwise/types";
import { generateReadwiseTestArticle } from "./helper";

describe('filter', () => {
    it('filters out articles with reading progress', () => {
        const articleList: ReadwiseArticle[] = [];

        for (let i = 0; i < 20; i++) {
            const reading_progress = i % 2 === 0 ? 50 : 0;

            articleList.push(generateReadwiseTestArticle({ reading_progress, word_count: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidReadwiseArticle(article));

        expect(filteredList.length).toEqual(10);
    })

    it('filters out articles with tags', () => {
        const articleList: ReadwiseArticle[] = [];

        const word_count = 1000;
        const reading_progress = 0;

        for (let i = 0; i < 20; i++) {
            const tags = i % 2 === 0 ? [] : ['test'];

            articleList.push(generateReadwiseTestArticle({ tags, word_count, reading_progress }))
        }

        const filteredList = articleList.filter((article) => isValidReadwiseArticle(article));

        expect(filteredList.length).toEqual(10);
    })

    it('filters out articles with less than 500 words', () => {
        const articleList: ReadwiseArticle[] = [];

        const reading_progress = 0;

        for (let i = 0; i < 20; i++) {
            const word_count = i % 2 === 0 ? 1500 : 200;

            articleList.push(generateReadwiseTestArticle({ word_count, reading_progress }))
        }

        const filteredList = articleList.filter((article) => isValidReadwiseArticle(article));

        expect(filteredList.length).toEqual(10);  
    })

    it('filters out articles without an id', () => {
        const articleList: ReadwiseArticle[] = [];

        const word_count = 1000;
        const reading_progress = 0;

        for (let i = 0; i < 20; i++) {
            const id = i % 2 === 0 ? undefined : "test";

            articleList.push(generateReadwiseTestArticle({ id, reading_progress, word_count }))
        }

        for (let i = 0; i < 20; i++) {
            const id = i % 2 === 0 ? '' : "test";

            articleList.push(generateReadwiseTestArticle({ id, reading_progress, word_count }))
        }

        const filteredList = articleList.filter((article) => isValidReadwiseArticle(article));

        expect(filteredList.length).toEqual(20);
    })

    it('filters out articles without a url', () => {
        const articleList: ReadwiseArticle[] = [];

        const word_count = 1000;
        const reading_progress = 0;

        for (let i = 0; i < 20; i++) {
            const url = i % 2 === 0 ? '' : "test";

            articleList.push(generateReadwiseTestArticle({ url, reading_progress, word_count }))
        }

        const filteredList = articleList.filter((article) => isValidReadwiseArticle(article));

        expect(filteredList.length).toEqual(10);
    })
})