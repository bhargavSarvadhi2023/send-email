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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const path = __importStar(require("path"));
const dayanamic_import_1 = require("../utils/dayanamic.import");
const folderPath = path.join(__dirname);
const excludedFiles = ['index.ts'];
const models = (0, dayanamic_import_1.DaynamicImport)(folderPath, excludedFiles);
const db = {
    sequelize: database_1.sequelize,
    Sequelize: sequelize_1.Sequelize,
};
exports.db = db;
Object.keys(models).forEach((modelName) => {
    const fileName = path.basename(modelName, path.extname(modelName));
    db[fileName] = models[modelName](database_1.sequelize);
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
database_1.sequelize.sync();
