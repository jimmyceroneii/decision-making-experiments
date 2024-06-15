import { Resend } from 'resend'
import * as dotenv from 'dotenv'
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY || '')

export const sendEmail = async (emailBody: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'jimmy.cerone@gmail.com',
    subject: 'Weekly Newsletter Template',
    html: emailBody,
  })
}
