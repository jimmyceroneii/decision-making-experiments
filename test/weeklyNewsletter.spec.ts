import { isWeeklyNewsletter } from "../backend/sources/readwise-reader/filter";
import type { ReadwiseArticle, Tags } from "../backend/sources/readwise-reader/types";
import { generateReadwiseTestArticle } from "./helper";

describe("filter", () => {
	const validTags = {
		newsletter: { name: "newsletter", type: "manual", created: 10 },
	};

	it("filters out articles without the proper tags", () => {
		const articleList: ReadwiseArticle[] = [];

		const invalidTags = { DATE: { name: "DATE", type: "manual", created: 10 } };

		for (let i = 0; i < 20; i++) {
			const tags: Tags = i % 2 === 0 ? validTags : invalidTags;

			articleList.push(generateReadwiseTestArticle({ tags }));
		}

		const filteredList = articleList.filter((article) =>
			isWeeklyNewsletter(article),
		);

		expect(filteredList.length).toEqual(10);
	});

	it("filters out articles without an id", () => {
		const articleList: ReadwiseArticle[] = [];

		for (let i = 0; i < 20; i++) {
			const id = i % 2 === 0 ? undefined : "test";

			articleList.push(generateReadwiseTestArticle({ id, tags: validTags }));
		}

		for (let i = 0; i < 20; i++) {
			const id = i % 2 === 0 ? "" : "test";

			articleList.push(generateReadwiseTestArticle({ id }));
		}

		const filteredList = articleList.filter((article) =>
			isWeeklyNewsletter(article),
		);

		expect(filteredList.length).toEqual(10);
	});

	it("filters out articles without a url", () => {
		const articleList: ReadwiseArticle[] = [];

		for (let i = 0; i < 20; i++) {
			const url = i % 2 === 0 ? "" : "test";

			articleList.push(generateReadwiseTestArticle({ url, tags: validTags }));
		}

		const filteredList = articleList.filter((article) =>
			isWeeklyNewsletter(article),
		);

		expect(filteredList.length).toEqual(10);
	});

	it("filters out articles without a title", () => {
		const articleList: ReadwiseArticle[] = [];

		for (let i = 0; i < 20; i++) {
			const title = i % 2 === 0 ? "" : "test";

			articleList.push(generateReadwiseTestArticle({ title, tags: validTags }));
		}

		const filteredList = articleList.filter((article) =>
			isWeeklyNewsletter(article),
		);

		expect(filteredList.length).toEqual(10);
	});
});
