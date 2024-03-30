import { Resend } from 'resend';
import fs from "fs";
import ejs from "ejs";

type GenerateEmailParams = {
  matterArticleUrl: string;
  matterArticleTitle: string;
  similarMatterArticles: string[];
  readwiseArticleUrl: string;
  readwiseArticleTitle: string;
  similarReadwiseArticles: string[];
}

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const generateEmail = ({
  matterArticleUrl, matterArticleTitle, similarMatterArticles,
  readwiseArticleUrl, readwiseArticleTitle, similarReadwiseArticles
}: GenerateEmailParams) => {
  const templateString = fs.readFileSync('src/email-templates/email.ejs', 'utf-8');

  return ejs.render(templateString, {
    matterArticleUrl, matterArticleTitle, similarMatterArticles,
    readwiseArticleUrl, readwiseArticleTitle, similarReadwiseArticles
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

console.log(generateEmail({
  matterArticleUrl: 'test.com', matterArticleTitle: 'title', similarMatterArticles: ['one', 'two'],
  readwiseArticleUrl: 'example.com', readwiseArticleTitle: 'Readwise', similarReadwiseArticles: ['three', 'four']
}))