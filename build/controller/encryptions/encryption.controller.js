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
Object.defineProperty(exports, "__esModule", { value: true });
exports.encriyptionController = void 0;
const encryption_1 = require("../../helpers/encryption");
class EncrptionController {
    encriptions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const encriptions = req.body.data;
                const data = (0, encryption_1.encrypt)(encriptions);
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    data: data,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    decrypt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dcrpt = req.body.data;
                const data = JSON.parse((0, encryption_1.decrypt)(dcrpt));
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    data: data,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.encriyptionController = new EncrptionController();
