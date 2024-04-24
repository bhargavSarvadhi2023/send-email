"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateString = void 0;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const capitalCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
/**
 * generateString
 * @param length length of string you requires
 * @returns string of given length
 * @description to generate random string
 */
const generateString = (length, capitalOnly = false) => {
    let result = '';
    const charStr = capitalOnly ? capitalCharacters : characters;
    const charactersLength = charStr.length;
    for (let i = 0; i < length; i++) {
        result += charStr.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateString = generateString;
