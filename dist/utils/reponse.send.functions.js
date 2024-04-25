"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const constant_1 = require("../constant");
const responseMappings = {
    [constant_1.RES_STATUS.CREATE]: {
        statusCode: 201,
        defaultMessage: constant_1.RES_TYPES.CREATE,
    },
    [constant_1.RES_STATUS.GET]: {
        statusCode: 200,
        defaultMessage: constant_1.RES_TYPES.FETCH,
    },
    [constant_1.RES_STATUS.DELETE]: {
        statusCode: 200,
        defaultMessage: constant_1.RES_TYPES.DELETE,
    },
    [constant_1.RES_STATUS.UPDATE]: {
        statusCode: 200,
        defaultMessage: constant_1.RES_TYPES.UPDATE,
    },
    default: { statusCode: 200, defaultMessage: 'Success' },
};
const sendResponse = (res, response) => {
    var _a, _b, _c;
    const mapping = responseMappings[response.responseType] || responseMappings.default;
    const { statusCode, defaultMessage } = mapping;
    const message = response.message || defaultMessage;
    const isLocalhost = res.locals.isLocalhost || false;
    if (response.responseType === constant_1.RES_STATUS.GET) {
        return res.status(statusCode).json({
            success: true,
            statusCode: statusCode,
            data: response.data, // temporary
            message: message,
            pagination: {
                total: response.total || 0,
                pageIndex: Math.floor(((_a = response === null || response === void 0 ? void 0 : response.paginations) === null || _a === void 0 ? void 0 : _a.offset) /
                    ((_b = response === null || response === void 0 ? void 0 : response.paginations) === null || _b === void 0 ? void 0 : _b.limit)) + 1 || null,
                pageSize: ((_c = response === null || response === void 0 ? void 0 : response.paginations) === null || _c === void 0 ? void 0 : _c.limit) || null,
            },
        });
    }
    else {
        return res.status(statusCode).json({
            success: true,
            statusCode: statusCode,
            data: response.data, // temporary
            message: message,
        });
    }
};
exports.sendResponse = sendResponse;
