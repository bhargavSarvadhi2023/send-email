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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationEmail = void 0;
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const logger_1 = require("./logger/logger");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const middleware_1 = require("./middleware");
const nodemailer_1 = require("./controller/nodemailer");
Object.defineProperty(exports, "SendNotificationEmail", { enumerable: true, get: function () { return nodemailer_1.SendNotificationEmail; } });
const port = 8000;
const isLocalhost = (req) => req.hostname === 'localhost'; //tempory
class AppServer {
    constructor() {
        const app = (0, express_1.default)();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json({}));
        app.use((0, cors_1.default)({
            origin: '*',
            credentials: true,
        }));
        app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECERET,
            resave: false,
            saveUninitialized: true,
        }));
        app.use(middleware_1.ErrorHandler);
        app.listen(port, () => {
            logger_1.logger.info(`🚀 Server is listening on Port:- ${port}`);
        });
    }
}
new AppServer();
