import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const sendEmail = async (emailBody: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'jimmy.cerone@gmail.com',
        subject: 'Product of the Week',
        html: `<p>The product of the week is: \n\n${emailBody}</p>`
      });
}
