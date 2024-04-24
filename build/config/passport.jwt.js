"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.TokenController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const model_1 = require("../model");
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const jwt = __importStar(require("jsonwebtoken"));
const constant_1 = require("../constant");
const logger_1 = require("../logger/logger");
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECERET,
};
exports.default = passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwtPayload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield model_1.db[constant_1.MODEL.USER].findByPk(jwtPayload.id);
            if (user) {
                return done(null, user);
            }
        }
        catch (error) {
            return done(error, false);
        }
    });
}));
class Token {
    createToken(payload, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expiresIn = '365d';
                const token = jwt.sign(payload, process.env.JWT_SECERET, {
                    algorithm: 'HS256',
                    expiresIn,
                });
                return token;
            }
            catch (error) {
                return next(error);
            }
        });
    }
    decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECERET);
                return decoded;
            }
            catch (error) {
                logger_1.logger.info('decode token in error', error);
            }
        });
    }
}
exports.TokenController = new Token();
