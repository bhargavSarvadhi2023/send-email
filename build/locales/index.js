"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("i18n");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const i18nConfigurations = {
    locales: process.env.APP_LANGUAGES.split(','),
    directory: `${__dirname}/`,
    languageHeaderField: 'lan',
    defaultLocale: process.env.APP_LANGUAGES.split(',')[0],
    autoReload: true,
    updateFiles: false,
};
const i18n = new i18n_1.I18n(i18nConfigurations);
exports.default = i18n;
