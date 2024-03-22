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

    const articleWithNull: Article = {
        id: '12341',
        title: 'Test',
        author: null,
        publisher: null,
        url: 'https://example.com',
        tags: 'test, test',
        wordCount: 100,
        inQueue: true,
        favorited: true,
        read: false,
        highlightCount: 5,
        lastInteractionDate: "2024-10-11",
    }

    const articleWithEmptyString: Article = {
        id: '12341',
        title: 'Test',
        author: '',
        publisher: '',
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
        expect(validationResponse.error?.details[0].type).toEqual('any.required');
        expect(validationResponse.error?.details[0].message).toEqual('"publisher" is required');
    })

    test("allows null values for required properties", () => {
        const validationResponse = articleSchema.validate(articleWithNull);

        expect(validationResponse.error).toBeUndefined();
    })

    test('allows empty strings for required properties', () => {
        const validationResponse = articleSchema.validate(articleWithEmptyString);

        expect(validationResponse.error).toBeUndefined();
    })
})