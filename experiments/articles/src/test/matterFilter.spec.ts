import { isValidMatterArticle } from "../sources/matter/filter";
import { MatterArticle } from "../sources/matter/types";
import { generateMatterTestArticle } from "./helper";

describe('filter', () => {
    it('filters out articles with read as true', () => {
        const articleList: MatterArticle[] = [];

        for (let i = 0; i < 20; i++) {
            const read = i % 2 === 0 ? true : false;

            articleList.push(generateMatterTestArticle({ read, inQueue: true, wordCount: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidMatterArticle(article));

        expect(filteredList.length).toEqual(10);
    })

    it('filters out articles with inQueue as false', () => {
        const articleList: MatterArticle[] = [];

        for (let i = 0; i < 20; i++) {
            const inQueue = i % 2 === 0 ? true : false;

            articleList.push(generateMatterTestArticle({ inQueue, read: false, wordCount: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidMatterArticle(article));

        expect(filteredList.length).toEqual(10);
    })

    it('filters out articles with less than 500 words', () => {
        const articleList: MatterArticle[] = [];

        for (let i = 0; i < 20; i++) {
            const wordCount = i % 2 === 0 ? 1500 : 200;

            articleList.push(generateMatterTestArticle({ inQueue: true, read: false, wordCount }))
        }

        const filteredList = articleList.filter((article) => isValidMatterArticle(article));

        expect(filteredList.length).toEqual(10);  
    })

    it('filters out articles without an id', () => {
        const articleList: MatterArticle[] = [];

        for (let i = 0; i < 20; i++) {
            const id = i % 2 === 0 ? undefined : "test";

            articleList.push(generateMatterTestArticle({ id, inQueue: true, read: false, wordCount: 1000 }))
        }

        for (let i = 0; i < 20; i++) {
            const id = i % 2 === 0 ? '' : "test";

            articleList.push(generateMatterTestArticle({ id, inQueue: true, read: false, wordCount: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidMatterArticle(article));

        expect(filteredList.length).toEqual(20);
    })

    it('filters out articles without a url', () => {
        const articleList: MatterArticle[] = [];

        for (let i = 0; i < 20; i++) {
            const url = i % 2 === 0 ? '' : "test";

            articleList.push(generateMatterTestArticle({ url, inQueue: true, read: false, wordCount: 1000 }))
        }

        const filteredList = articleList.filter((article) => isValidMatterArticle(article));

        expect(filteredList.length).toEqual(10);
    })
})