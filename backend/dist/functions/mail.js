"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer = require("nodemailer");
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
function sendMail(fromEmail, toEmails, subject, html) {
    return __awaiter(this, void 0, void 0, function* () {
        let to = toEmails.join(",");
        const info = yield transporter.sendMail({
            from: fromEmail,
            to: to,
            subject: subject,
            html: html, // HTML body
        });
        if (info.rejected) {
            return new Error('Mail not sent');
        }
        return 'Mail sent' + `${info.response}`;
    });
}
