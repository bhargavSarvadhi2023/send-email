"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../constant/index");
const utils_1 = require("../utils");
const auth_routes_1 = require("./auth/auth.routes");
const passport_1 = __importDefault(require("passport"));
const user_1 = require("./user");
class InvalidedRouter {
    handleRequest(req, res, next) {
        return next(new utils_1.AppError(`${req.url} - ${index_1.RES_TYPES.BAD_URL}`, index_1.ERRORTYPES.NOT_FOUND));
    }
}
class MainRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.invalidedRouter = new InvalidedRouter();
    }
    setupRoutes() {
        this.router.use(index_1.END_POINTS.AUTH, auth_routes_1.authRoutes);
        this.router.use(index_1.END_POINTS.USER, passport_1.default.authenticate('jwt', { session: false }), user_1.userRoutes);
        this.router.all(index_1.END_POINTS.ALL, (req, res, next) => this.invalidedRouter.handleRequest(req, res, next));
    }
}
const mainRouter = new MainRouter();
mainRouter.setupRoutes();
exports.default = mainRouter.router;
