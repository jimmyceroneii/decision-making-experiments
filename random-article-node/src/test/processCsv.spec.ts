import { Article, articleSchema } from "../types"

describe("Article Schema", () => {
    const validArticle: Article = {
        id: '12341',
        title: 'Test',
        author: 'author',
        publisher: 'me',
        url: 'https://example.com',
        tags: 'test, test',
        wordCount: 100,
        inQueue: true,
        favorited: true,
        read: false,
        highlightCount: 5,
        lastInteractionDate: "2024-10-11",
    }

    const incompleteArticle = {
        id: '12341',
        title: 'Test',
        author: 'author',
        url: 'https://example.com',
        tags: 'test, test',
        wordCount: 100,
        inQueue: true,
        favorited: true,
        read: false,
        highlightCount: 5,
        lastInteractionDate: "2024-10-11",
    }

    test("accepts a valid article schema", () => {
        const validationResponse = articleSchema.validate(validArticle);

        expect(validationResponse.error).toBeUndefined();
    });

    test("requires all properties to be present", () => {
        const validationResponse = articleSchema.validate(incompleteArticle);

        console.log(validationResponse.error);

        expect(validationResponse.error).toBeDefined();
    })
})