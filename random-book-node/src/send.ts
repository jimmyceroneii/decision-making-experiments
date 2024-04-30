import { Resend } from 'resend';
import fs from "fs";
import ejs from "ejs";
import { Book } from '../sources/goodreads/types';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const generateEmail = ({ book, bookUrl }: { book: Book, bookUrl: string }) => {
  const templateString = fs.readFileSync('src/email-templates/email.ejs', 'utf-8');
  
  return ejs.render(templateString, { book, bookUrl });
}

export const sendEmail = async (emailBody: string) => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'jimmy.cerone@gmail.com',
            subject: 'Book of the Week',
            html: emailBody
        });
    } catch (e) {
        console.log('error sending: ', emailBody);
    }
}
