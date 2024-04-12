import { generateEmail, sendEmail } from "./send";
import { retrieveReadwiseArticle } from "./sources/readwise";

const main = async () => {
  try {
    const { weeklyArticles } = await retrieveReadwiseArticle();

    console.log('weeklyArticles: ', weeklyArticles.map((article) => article.title))

    console.log('\ngenerating template...');

    const newsletterTemplate = generateEmail({weeklyArticles});

    console.log('\nsending email...');

    await sendEmail(newsletterTemplate);
  } catch (error) {
    console.error(`Error while setting up newsletter: ${error}`)
  }
}

main()