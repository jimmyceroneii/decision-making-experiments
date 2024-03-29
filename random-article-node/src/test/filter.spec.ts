import { isValidArticle } from "../sources/matter/filter";
import { Article } from "../sources/matter/types";
import { generateTestArticle } from "./helper";

describe('filter', () => {
    it('filters out articles with read as true', () => {
        const articleList: Article[] = [];

        for (let i = 0; i < 20; i++) {
            const read = i % 2 === 0 ? true : false;

            articleList.push(generateTestArticle({ read, inQueue: true, wordCount: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidArticle(article));

        expect(filteredList.length).toEqual(10);
    })

    it('filters out articles with inQueue as false', () => {
        const articleList: Article[] = [];

        for (let i = 0; i < 20; i++) {
            const inQueue = i % 2 === 0 ? true : false;

            articleList.push(generateTestArticle({ inQueue, read: false, wordCount: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidArticle(article));

        expect(filteredList.length).toEqual(10);
    })

    it('filters out articles with less than 500 words', () => {
        const articleList: Article[] = [];

        for (let i = 0; i < 20; i++) {
            const wordCount = i % 2 === 0 ? 1500 : 200;

            articleList.push(generateTestArticle({ inQueue: true, read: false, wordCount }))
        }

        const filteredList = articleList.filter((article) => isValidArticle(article));

        expect(filteredList.length).toEqual(10);  
    })

    it('filters out articles without an id', () => {
        const articleList: Article[] = [];

        for (let i = 0; i < 20; i++) {
            const id = i % 2 === 0 ? undefined : "test";

            articleList.push(generateTestArticle({ id, inQueue: true, read: false, wordCount: 1000 }))
        }

        for (let i = 0; i < 20; i++) {
            const id = i % 2 === 0 ? '' : "test";

            articleList.push(generateTestArticle({ id, inQueue: true, read: false, wordCount: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidArticle(article));

        expect(filteredList.length).toEqual(20);
    })

    it('filters out articles without a url', () => {
        const articleList: Article[] = [];

        for (let i = 0; i < 20; i++) {
            const url = i % 2 === 0 ? '' : "test";

            articleList.push(generateTestArticle({ url, inQueue: true, read: false, wordCount: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidArticle(article));

        expect(filteredList.length).toEqual(10);
    })
})