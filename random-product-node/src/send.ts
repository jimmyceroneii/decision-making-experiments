import { Resend } from 'resend';
import fs from "fs";
import ejs from "ejs";

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const generateEmail = (product: string, sources: string[], similarProducts: string[]) => {
  const templateString = fs.readFileSync('src/email-templates/email.ejs', 'utf-8');
  
  return ejs.render(templateString, { product, sources, similarProducts });
}

export const sendEmail = async (emailBody: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'jimmy.cerone@gmail.com',
        subject: 'Product of the Week',
        html: emailBody
      });
}
