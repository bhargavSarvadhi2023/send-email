# SendNotificationEmail

SendNotificationEmail is a Node.js package that provides a convenient way to send notification emails using Nodemailer.

## Installation

To install SendNotificationEmail, you can use github repository urls

You can make package name add github repository url in package.json file

EXAMPLE

"mailer":"git+https://github.com/bhargavSarvadhi2023/send-email.git"

```bash
yarn add mailer
```

## Usage

```
import { SendNotificationEmail } from 'send-notification-email';

// Initialize SendNotificationEmail instance
const emailSender = new SendNotificationEmail();

// Send email
emailSender.sendEmail(
    'Subject',
    'recipient@example.com',
    { key: 'value' },
    '<p>Hello, this is the email content.</p>',
);
```

## Configuration

Before using `SendNotificationEmail`, make sure to set up your environment variables for Gmail service:

```dotenv
MAIL_EMAIL=your_email@gmail.com
MAIL_PASS=your_password
```

Parameters
subject: Subject of the email.
emails_to: Recipient email(s) separated by commas.
extra: Additional data to include in the email.
html_content: HTML content of the email.
