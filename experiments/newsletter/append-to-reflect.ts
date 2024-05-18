import { generateEmail } from "./generate-email";
import { generateReadwiseTestArticle } from "./test/helpers";

const REFLECT_ACCESS_TOKEN = process.env.REFLECT_ACCESS_TOKEN;

export const appendToReflect = async (text: string) => {
    try { 
        const today = new Date().toLocaleDateString()

        const response = await fetch(
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
            }
        );

        console.log(response.status)
        console.log(await response.json())
    } catch (e) {
        console.log('error when adding to reflect: ', e);
        throw e;
    }
}

const main = async () => {
    const article = generateReadwiseTestArticle({});

    const markdown = generateEmail({ weeklyArticles: [ article ] })

    await appendToReflect(markdown);
}

main()