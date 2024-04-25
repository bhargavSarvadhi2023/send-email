"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const logger_1 = require("../logger/logger");
const index_1 = require("../constant/index");
function GenerateCustomError(err, statusCode, res) {
    const ErrorObj = { statusCode, message: err.message };
    return res.status(statusCode).send(ErrorObj);
}
function ErrorHandler(err, req, res, next) {
    if (err.ErrorName === undefined) {
        switch (err instanceof Error) {
            case err.name === index_1.ERRORTYPES.SEQUELIZE_VALIDATION:
                logger_1.logger.error(`${err.message}`);
                return GenerateCustomError(err.errors[0], 400, res);
            case err.name === index_1.ERRORTYPES.SEQUELIZE_CONSTRAINT:
                logger_1.logger.error(`${err.message}`);
                return GenerateCustomError(err.errors[0], 409, res);
            case err.name === index_1.ERRORTYPES.SEQUELIZE_FORRIGENKEY_CONSTRAINT:
                logger_1.logger.error(`${err.message}`);
                return GenerateCustomError(err, 400, res);
            default:
                logger_1.logger.error(`${err.message}`);
                GenerateCustomError(err, 500, res);
                break;
        }
    }
    else {
        switch (err.ErrorName) {
            case index_1.ERRORTYPES.FORBIDDEN:
                logger_1.logger.error(`${err.message}`);
                GenerateCustomError(err, 403, res);
                break;
            case index_1.ERRORTYPES.CONFLICT:
                logger_1.logger.error(`${err.message}`);
                GenerateCustomError(err, 409, res);
                break;
            case index_1.ERRORTYPES.INVALID_REQUEST:
                logger_1.logger.error(`${err.message}`);
                GenerateCustomError(err, 400, res);
                break;
            case index_1.ERRORTYPES.NOT_FOUND:
                logger_1.logger.error(`${err.message}`);
                GenerateCustomError(err, 404, res);
                break;
            case index_1.ERRORTYPES.UNAUTHORIZED:
                logger_1.logger.error(`${err.message}`);
                GenerateCustomError(err, 401, res);
                break;
            case index_1.ERRORTYPES.VALIDATION_ERROR:
                logger_1.logger.error(`${err.message}`);
                GenerateCustomError(err, 400, res);
                break;
            default:
                logger_1.logger.error(`${err.message}`);
                GenerateCustomError(err, 500, res);
                break;
        }
    }
}
exports.ErrorHandler = ErrorHandler;
