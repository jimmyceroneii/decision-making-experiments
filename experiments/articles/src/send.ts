import { Resend } from 'resend';
import fs from "fs";
import ejs from "ejs";
import { DocumentContent } from 'metaphor-node';

type GenerateEmailParams = {
  readwiseArticleUrl: string;
  readwiseArticleTitle: string;
  relatedArticles: DocumentContent[];
  matterArticleUrl: string;
  matterArticleTitle: string;
  similarMatterArticles: string[];
}

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const generateEmail = ({
  readwiseArticleUrl, readwiseArticleTitle, relatedArticles,
  matterArticleUrl, matterArticleTitle, similarMatterArticles
}: GenerateEmailParams) => {
  const templateString = fs.readFileSync('src/email-templates/email.ejs', 'utf-8');

  return ejs.render(templateString, {
    readwiseArticleUrl, readwiseArticleTitle, relatedArticles,
    matterArticleUrl, matterArticleTitle, similarMatterArticles
  });
}

export const sendEmail = async (emailBody: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'jimmy.cerone@gmail.com',
    subject: 'Article of the Day',
    html: emailBody
  });
}
