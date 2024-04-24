"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORTYPES = void 0;
var ERRORTYPES;
(function (ERRORTYPES) {
    ERRORTYPES["NOT_FOUND"] = "not_found";
    ERRORTYPES["FORBIDDEN"] = "Forbidden";
    ERRORTYPES["INVALID_REQUEST"] = "invalid_request";
    ERRORTYPES["CONFLICT"] = "conflict";
    ERRORTYPES["UNAUTHORIZED"] = "unauthorized";
    ERRORTYPES["UNKNOWN_ERROR"] = "unknown_error";
    ERRORTYPES["VALIDATION_ERROR"] = "validation_error";
    ERRORTYPES["SEQUELIZE_VALIDATION"] = "SequelizeValidationError";
    ERRORTYPES["SEQUELIZE_CONSTRAINT"] = "SequelizeUniqueConstraintError";
    ERRORTYPES["SEQUELIZE_FORRIGENKEY_CONSTRAINT"] = "SequelizeForeignKeyConstraintError";
})(ERRORTYPES || (exports.ERRORTYPES = ERRORTYPES = {}));
