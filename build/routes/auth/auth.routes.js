"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const base_routes_1 = __importDefault(require("../base.routes"));
const index_1 = require("../../constant/index");
const auth_1 = require("../../controller/auth");
class AuthRoutes extends base_routes_1.default {
    initializeRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.post(index_1.END_POINTS.LOGIN, auth_1.authController.login);
        });
    }
}
exports.authRoutes = new AuthRoutes().router;
