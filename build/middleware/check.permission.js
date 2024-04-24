"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const index_1 = require("../constant/index");
const index_2 = require("../utils/index");
function checkPermission(roles) {
    return function (req, res, next) {
        if (roles.includes(req.user.role)) {
            return next();
        }
        throw new index_2.AppError(index_1.RES_TYPES.NOT_PERMISSION, index_1.ERRORTYPES.FORBIDDEN);
    };
}
exports.checkPermission = checkPermission;
