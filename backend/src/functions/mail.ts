import nodemailer = require('nodemailer')
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "kunalindia59@gmail.com",
        pass: "cnbd vopo szuf nfss",
    },
});

export async function sendMail(fromEmail: string, toEmails: string[], subject: string, html: string) {
    let to = toEmails.join(",");

    const info = await transporter.sendMail({
        from: fromEmail,
        to: to,
        subject: subject,
        html: html, // HTML body
    });
    if (info.rejected) {
        return new Error('Mail not sent')
    }
    return 'Mail sent' + `${info.response}`
}