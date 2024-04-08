import { generateEmail, sendEmail } from './send';
import { retrieveMatterArticles } from './sources/matter';
import { retrieveReadwiseArticle } from './sources/readwise';

const main = async () => {
  try {
    const { readwiseArticleTitle, readwiseArticleUrl, similarReadwiseArticles } = await retrieveReadwiseArticle();
    
    const emailHtml = generateEmail({
      readwiseArticleUrl, readwiseArticleTitle, similarReadwiseArticles
    });

    console.log('sending email with daily article...')

    await sendEmail(emailHtml);

    console.log('sent articles of the day')
  } catch (error) {
    console.error(`Error while sending article of the day: ${error}`);

    throw error;
  }
}

main()