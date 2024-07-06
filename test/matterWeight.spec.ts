import { matterArticleWeightFn } from "../sources/matter/matterWeightFn";
import { generateMatterTestArticle } from "./helper";

describe("matterWeightFn", () => {
	it("function generates a weight", () => {
		const article = generateMatterTestArticle({
			lastInteractionDate: "2023-11-17 17:54:18",
		});

		const weight = matterArticleWeightFn({
			article,
			date: new Date("2024-06-25"),
		});

		// the difference between today's date and november 2023
		expect(weight).toBeCloseTo(220.045625, 0);
	});
});
