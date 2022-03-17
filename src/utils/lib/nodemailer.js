import { SMTP_USER, SMTP_PASS } from '../../config/nodemailer.js'
import nodemailer from 'nodemailer'
import htmlTemplate from '../emailTemplate.js'

/**
 * @param recipients - list OR string of receivers
 * @param subject - the email subject
 * @param directUrl - user generated url
 * @param formType - this is an object that you can import from this module
 * @returns {{Promise}}
 */

async function sendEmails({ recipients, subject, directUrl, formType }) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'The Movieplay Team <themovieplay@gmail.com>',
    to: recipients,
    subject,
    html: htmlTemplate(directUrl, formType),
  })
}

const FormTypes = Object.freeze({
  reset: 'reset',
  verify: 'verify',
  updates: 'updates',
})

export { sendEmails, FormTypes }
