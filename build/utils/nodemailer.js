"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const logger_1 = require("../logger/logger");
const constant_1 = require("../constant");
const utils_1 = require("../utils");
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASS,
    },
});
class SendNotificationEmail {
    constructor(types, emails, extra) {
        console.log(extra.otp);
        this.sendEmail(types, emails, extra);
    }
    sendEmail(types, emails, extra) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let subject = '', htmlContent = '';
                switch (types) {
                    case constant_1.NotificationTypes.ACTIVE_ACCOUNT:
                        subject = 'Account Activated';
                        htmlContent = `
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <title>Account Verified</title>
                                    <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        line-height: 1.6;
                                    }

                                    .container {
                                        max-width: 600px;
                                        margin: auto;
                                        padding: 20px;
                                        border: 1px solid #ccc;
                                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                    }

                                    h1 {
                                        color: #333;
                                    }

                                    p {
                                        margin-bottom: 20px;
                                    }

                                    .button {
                                        display: inline-block;
                                        padding: 10px 20px;
                                        background-color: #007bff;
                                        color: #fff;
                                        text-decoration: none;
                                        border-radius: 4px;
                                    }

                                    .footer {
                                        margin-top: 20px;
                                        border-top: 1px solid #ccc;
                                        padding-top: 20px;
                                        font-size: 0.9em;
                                        color: #666;
                                    }
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                    <h1>Account Verified</h1>
                                    <p>Dear ${extra.fistname},</p>
                                    <p>
                                        We are pleased to inform you that your account has been successfully
                                        verified by our admin team. You can now access all the features and
                                        functionalities available for professionals.
                                    </p>
                                    <p>To get started, please click the button below:</p>
                                    <a href="${process.env.SHIDDUCH_URL}/app/project/dashboard" class="button">Access Dashboard</a>
                                    <p>
                                        If you encounter any issues or have questions, feel free to contact our
                                        support team. We're here to help!
                                    </p>
                                    <div class="footer">
                                        <p>Thank you for choosing our platform.</p>
                                        <p>Best regards,<br />Your Shidduch Team</p>
                                    </div>
                                    </div>
                                </body>
                                </html>
                               `;
                        break;
                    case constant_1.NotificationTypes.FORGOT_PSW:
                        subject = 'Forget Password';
                        htmlContent = `
                        <html>
            <head>
                <style>
                    .email-container {
                        background-color: #f5f5f5;
                        padding: 20px;
                        border-radius: 5px;
                        font-family: Arial, sans-serif;
                    }
                    .otp-message{
                        font-weight:bold;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <h1>Your OTP for Reset-Password </h1>
                    <p>Hello there!</p>
                    <p>This is your one-time password (OTP) to verify your account.
                     Please enter this code within the next 3 minutes:</p>
                    <p class="otp-message">Your otp is :- ${extra.otp}</p>
                    <p>If you did not request an OTP, please ignore this email.</p>
                    <p>Regards,</p>
                    <p>Your TGX Team</p>
                </div>
            </body>
            </html>`;
                        break;
                    case constant_1.NotificationTypes.SEND_CREDENTIAL:
                        subject = 'Shidduch Login Credential ';
                        htmlContent = `<html>
            <head>
                <style>
                    body {
                        background-color: #f0f0f0;
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                    }
                    .email-container {
                        background-color: #fff;
                        width: 80%;
                        margin: 20px auto;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #3498db;
                        text-align: center;
                    }
                    p {
                        color: #555;
                        line-height: 1.2;
                    }
                    strong {
                        color: #333;
                    }
                    .support-info {
                        margin-top: 20px;
                        color: #777;
                    }
                    .footer {
                        margin-top: 20px;
                        color: #555;
                    }
                </style>
             </head>
             <body>
               <div class="email-container">
                    <h1>Shidduch Login Credentials</h1>
                    <p>Hello there!</p>
                    <p>Your login credentials for the Shidduch system are provided below:</p>
                    <p><strong>Email:</strong> <b> ${emails} </b></p>
                    <p><strong>Password:</strong> <b>${extra['password']} </b></p>
                    <p>Please keep these credentials secure and do not share them with others.</p>
                    <p>If you have any questions or need assistance, please feel free to contact our support team.</p>
                    <div class="support-info">
                        <p>Regards,</p>
                        <p>Your Shidduch Team</p>
                    </div>
                </div>
             </body>
             </html>
`;
                        break;
                    case constant_1.NotificationTypes.SEND_PROFESSIONAL_SIGNUP_NOTIFICATION:
                        subject = 'Signed up new shadchan ';
                        htmlContent = `<html>
            <head>
                <style>
                    body {
                        background-color: #f0f0f0;
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                    }
                    .email-container {
                        background-color: #fff;
                        width: 80%;
                        margin: 20px auto;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #3498db;
                        text-align: center;
                    }
                    p {
                        color: #555;
                        line-height: 1.2;
                    }
                     .button {
                         display: inline-block;
                         padding: 10px;
                         background-color: #007bff;
                         color: #fff;
                         text-decoration: none;
                         border-radius: 4px;
                         font-size:12px;
                         height: 10px;
                    }
                    strong {
                        color: #333;
                    }
                    .support-info {
                        margin-top: 20px;
                        color: #777;
                    }
                    .footer {
                        margin-top: 20px;
                        color: #555;
                    }
                </style>
             </head>
             <body>
               <div class="email-container">
           <h1>New Shadchan Signed Up,  Verification Required</h1>
            <p>Dear Admin,</p>
            <p>
                I hope this message finds you well. We have a new Shadchan signup awaiting your verification. Please find the details below:
            </p>
            <p><strong>Name:</strong> ${extra['firstname']}</p>
            <p><strong>Email:</strong> ${extra['email']}</p>
            <p><strong>Signup Date:</strong> ${extra['date']}</p>
            <p>
              You can verify the Shadchan by accessing the admin panel here: <a href="${process.env.SHIDDUCH_URL}/app/project/shadchan" class="button">Verify shadchan</a>
            </p>
            <p>
                Thank you for your attention and cooperation.
            </p>
                </div>
             </body>
             </html>
`;
                        break;
                    default:
                        throw new utils_1.AppError(constant_1.RES_TYPES.INVALID_NOTIFICATION_TYPE, constant_1.ERRORTYPES.INVALID_REQUEST);
                }
                const mailOptions = {
                    from: process.env.MAIL_EMAIL,
                    to: emails,
                    subject,
                    html: htmlContent,
                };
                yield transporter.sendMail(mailOptions);
                logger_1.logger.info(`Email sent successfully to ${emails}`);
            }
            catch (err) {
                logger_1.logger.error(`Error sending email: ${err}`);
            }
        });
    }
}
exports.SendNotificationEmail = SendNotificationEmail;
