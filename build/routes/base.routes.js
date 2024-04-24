"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const constant_1 = require("../constant");
class BaseRoute {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        throw new utils_1.AppError(constant_1.RES_TYPES.INTIALROUTES_SUBCLASSES, constant_1.ERRORTYPES.NOT_FOUND);
    }
}
exports.default = BaseRoute;
