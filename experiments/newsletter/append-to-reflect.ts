import * as dotenv from "dotenv";
dotenv.config();

const REFLECT_ACCESS_TOKEN = process.env.REFLECT_ACCESS_TOKEN;

export const appendToReflect = async (text: string) => {
	try {
		const today = new Date().toLocaleDateString() + " Newsletter";

		await fetch("https://reflect.app/api/graphs/jimmyceroneii/notes", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${REFLECT_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				subject: today,
				content_markdown: text,
			}),
		});
	} catch (e) {
		console.log("error when adding to reflect: ", e);
		throw e;
	}
};
