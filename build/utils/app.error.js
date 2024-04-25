"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, ErrorName) {
        super(message);
        this.ErrorName = ErrorName;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
