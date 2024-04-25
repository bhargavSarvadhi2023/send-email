export declare class SendNotificationEmail {
    constructor(subject: any, email_from: any, email_to: string, extra: any, html_content: any);
    sendEmail(subject: string, emails_to: string, extra: any, html_content: any): Promise<void>;
}
