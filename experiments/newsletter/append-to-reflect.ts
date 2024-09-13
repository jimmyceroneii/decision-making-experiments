import * as dotenv from "dotenv";
dotenv.config();

const REFLECT_ACCESS_TOKEN = process.env.REFLECT_ACCESS_TOKEN;

export const appendToReflect = async (text: string) => {
	try {
		const today = `${new Date().toLocaleDateString()} Newsletter`;

		const result = await fetch(
			"https://reflect.app/api/graphs/jimmyceroneii/notes",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${REFLECT_ACCESS_TOKEN}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					subject: today,
					content_markdown: text,
				}),
			},
		);

		if (result.status !== 200) {
			console.log("error in writing to reflect: ", result.status);
		}
	} catch (e) {
		console.log("error when adding to reflect: ", e);
		throw e;
	}
};