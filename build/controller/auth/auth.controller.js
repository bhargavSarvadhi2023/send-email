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
exports.authController = void 0;
const model_1 = require("../../model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const constant_1 = require("../../constant");
const utils_1 = require("../../utils");
const passport_jwt_1 = require("../../config/passport.jwt");
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { data: { email, password }, }, } = req;
                const result = yield model_1.db[constant_1.MODEL.USER].findOne({ where: { email } });
                if (result && result.authenticate(password)) {
                    const payload = {
                        id: result.id,
                        Email: result.email,
                        phone: result.phone,
                    };
                    const token = yield passport_jwt_1.TokenController.createToken(payload, next);
                    return (0, utils_1.sendResponse)(res, {
                        success: true,
                        data: {
                            token: token,
                            id: result.id,
                            role: result.role,
                            email: result.email,
                        },
                        message: res.__('common').login,
                    });
                }
                else {
                    return next(new utils_1.AppError(constant_1.RES_TYPES.AUTH_FAIL, constant_1.ERRORTYPES.UNAUTHORIZED));
                }
            }
            catch (error) {
                return next(error);
            }
        });
    }
    sign_up(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { data: { phone, email }, }, } = req;
                const exist_user = yield model_1.db[constant_1.MODEL.USER].findOne({
                    where: { email },
                });
                if (exist_user) {
                    return next(new utils_1.AppError(constant_1.RES_TYPES.USER_EXISTS, constant_1.ERRORTYPES.CONFLICT));
                }
                req.body.data.role = constant_1.ROLES.USER;
                const create_user = yield model_1.db[constant_1.MODEL.USER].create(req.body.data);
                return (0, utils_1.sendResponse)(res, {
                    responseType: constant_1.RES_STATUS.CREATE,
                    message: res.__('user').create,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    admin_sign_up(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { data: { email }, }, } = req;
                const exist_user = yield model_1.db[constant_1.MODEL.USER].findOne({
                    where: { email },
                });
                if (exist_user) {
                    return next(new utils_1.AppError(constant_1.RES_TYPES.USER_EXISTS, constant_1.ERRORTYPES.CONFLICT));
                }
                req.body.data.role = constant_1.ROLES.SUPER_ADMIN;
                const create_user = yield model_1.db[constant_1.MODEL.USER].create(req.body.data);
                return (0, utils_1.sendResponse)(res, {
                    responseType: constant_1.RES_STATUS.CREATE,
                    message: res.__('user').create,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    admin_login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { data: { email, password }, }, } = req;
                const result = yield model_1.db[constant_1.MODEL.USER].findOne({
                    where: { email, role: constant_1.ROLES.SUPER_ADMIN },
                });
                if (result && result.authenticate(password)) {
                    const payload = {
                        id: result.id,
                        email: result.email,
                        phone: result.phone,
                    };
                    const token = yield passport_jwt_1.TokenController.createToken(payload, next);
                    return (0, utils_1.sendResponse)(res, {
                        success: true,
                        data: {
                            token: token,
                            id: result.id,
                            role: result.role,
                            email: result.email,
                        },
                        message: res.__('common').login,
                    });
                }
                else {
                    return next(new utils_1.AppError(constant_1.RES_TYPES.AUTH_FAIL, constant_1.ERRORTYPES.UNAUTHORIZED));
                }
            }
            catch (error) {
                return next(error);
            }
        });
    }
    forgot_password(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { params: { email }, } = req;
                const result = yield model_1.db[constant_1.MODEL.USER].findOne({ where: { email } });
                if (!result) {
                    return next(new utils_1.AppError(constant_1.RES_TYPES.AUTH_FAIL, constant_1.ERRORTYPES.UNAUTHORIZED));
                }
                const generateOTP = () => {
                    const otp = Math.floor(100000 + Math.random() * 900000);
                    return otp.toString();
                };
                const otp = generateOTP();
                const [existingotp, created] = yield model_1.db[constant_1.MODEL.OTP].findOrCreate({
                    where: { email: email },
                    defaults: {
                        email: email,
                        otp: otp,
                    },
                });
                if (!created) {
                    const update_otp = yield model_1.db[constant_1.MODEL.OTP].update({ otp: otp, is_verified: false }, { where: { email: email } });
                }
                const sendmail = new utils_1.SendNotificationEmail(constant_1.NotificationTypes.FORGOT_PSW, email, {
                    otp,
                });
                return (0, utils_1.sendResponse)(res, {
                    responseType: constant_1.RES_STATUS.GET,
                    message: res.__('common').otp_send,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    verfiy_otp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { data: { email, otp }, }, } = req;
                const verify_otp = yield model_1.db[constant_1.MODEL.OTP].findOne({
                    email,
                    otp,
                    is_verified: false,
                });
                if (!verify_otp) {
                    return next(new utils_1.AppError(constant_1.RES_TYPES.WRONG_OTP, constant_1.ERRORTYPES.UNAUTHORIZED));
                }
                const token = yield passport_jwt_1.TokenController.createToken({ email: email, otp }, next);
                return (0, utils_1.sendResponse)(res, {
                    responseType: constant_1.RES_STATUS.GET,
                    data: token,
                    message: res.__('common').otp_verified,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    change_password(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { data: { token, password }, }, } = req;
                const decodedtoken = yield passport_jwt_1.TokenController.decodeToken(token);
                const check_user = yield model_1.db[constant_1.MODEL.OTP].findOne({
                    emai: decodedtoken['email'],
                    otp: decodedtoken['otp'],
                    is_verified: true,
                });
                if (!check_user) {
                    return next(new utils_1.AppError(constant_1.RES_TYPES.WRONG_OTP, constant_1.ERRORTYPES.UNAUTHORIZED));
                }
                const update_password = yield model_1.db[constant_1.MODEL.USER].update({ password }, { where: { email: decodedtoken['email'] } });
                return (0, utils_1.sendResponse)(res, {
                    responseType: constant_1.RES_STATUS.GET,
                    message: res.__('common').update_password,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.authController = new AuthController();
