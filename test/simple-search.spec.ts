import { simpleSearch } from "../experiments/search/simple-search";
import type { ReadwiseArticle } from "../sources/readwise-reader/types";
import { generateReadwiseTestArticle } from "./helper";

describe("simpleSearch", () => {
	const sampleList: ReadwiseArticle[] = [];

	for (let i = 0; i < 20; i++) {
		sampleList.push(generateReadwiseTestArticle({ title: "tests" }));
	}

	it("returns no results when there are no matches", () => {
		const results = simpleSearch({ searchTerm: "", list: sampleList });

		expect(results.length).toEqual(0);
	});

	it("ignores search terms less than 4 characters", () => {
		const results = simpleSearch({ searchTerm: "test", list: sampleList });

		expect(results.length).toEqual(0);
	});

	it("returns all results when there is a match, regardless of case", () => {
		const results = simpleSearch({ searchTerm: "TESTS", list: sampleList });

		expect(results.length).toEqual(20);
	});
});
