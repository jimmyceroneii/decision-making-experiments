import { Resend } from 'resend';
import fs from "fs";
import ejs from "ejs";

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const generateEmail = (article: string, similarArticles: string[]) => {
  const templateString = fs.readFileSync('src/email-templates/email.ejs', 'utf-8');
  
  return ejs.render(templateString, { article, similarArticles });
}

export const sendEmail = async (emailBody: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'jimmy.cerone@gmail.com',
        subject: 'Article of the Day',
        html: emailBody
      });
}
