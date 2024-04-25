import nodemailer, { Transporter } from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();
import { logger } from '../logger/logger';
import { RES_TYPES, ERRORTYPES, NotificationTypes } from '../constant';
import { AppError } from '../utils';

const transporter: Transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASS,
    },
});

export class SendNotificationEmail {
    constructor(
        subject,
        email_from,
        email_to: string,
        extra: any,
        html_content,
    ) {
        this.sendEmail(subject, email_to, extra, html_content);
    }

    async sendEmail(
        subject: string,
        emails_to: string,
        extra: any,
        html_content,
    ) {
        try {
            let subject = '';
            const mailOptions = {
                from: process.env.MAIL_EMAIL,
                to: emails_to,
                subject,
                html: html_content,
            };
            await transporter.sendMail(mailOptions);
            logger.info(`Email sent successfully to ${emails_to}`);
        } catch (err) {
            logger.error(`Error sending email: ${err}`);
        }
    }
}
