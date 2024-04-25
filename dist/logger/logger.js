"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const index_1 = require("../constant/index");
exports.logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({
            level: 'info',
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp({
                format: index_1.DATE_FORMATE.TWELVE_HOURS,
            }), winston_1.format.printf((info) => `${info.timestamp} ${info.level} => ${info.message}`)),
        }),
    ],
});
