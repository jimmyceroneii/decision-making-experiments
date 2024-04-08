import { Resend } from 'resend';
import fs from "fs";
import ejs from "ejs";
import { ReadwiseArticle } from './sources/readwise/types';

type GenerateEmailParams = {
  weeklyArticles: ReadwiseArticle[]
}

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const generateEmail = ({
  weeklyArticles
}: GenerateEmailParams) => {
  const templateString = fs.readFileSync('src/newsletter-templates/newsletter.ejs', 'utf-8');

  return ejs.render(templateString, {
    weeklyArticles
  });
}

export const sendEmail = async (emailBody: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'jimmy.cerone@gmail.com',
    subject: 'Weekly Newsletter Template',
    html: emailBody
  });
}