import express, { Express } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { logger } from './logger/logger';
import cors from 'cors';
import session from 'express-session';
import { ErrorHandler } from './middleware';
import { SendNotificationEmail } from './controller/nodemailer';

module.exports = SendNotificationEmail;

const port = process.env.PORT_SERVER || 8000;
const isLocalhost = (req) => req.hostname === 'localhost'; //tempory

class AppServer {
    constructor() {
        const app: Express = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json({}));
        app.use(
            cors({
                origin: '*',
                credentials: true,
            }),
        );
        app.use(
            session({
                secret: process.env.SESSION_SECERET,
                resave: false,
                saveUninitialized: true,
            }),
        );
        app.use(ErrorHandler);
        app.listen(port, () => {
            logger.info(`🚀 Server is listening on Port:- ${port}`);
        });
    }
}
new AppServer();
