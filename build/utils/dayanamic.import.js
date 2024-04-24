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
exports.DaynamicImport = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const logger_1 = require("../logger/logger");
const DaynamicImport = (folderPath, excludedFiles) => {
    const importedModules = {};
    const processDirectory = (dirPath) => {
        const items = fs.readdirSync(dirPath);
        items.forEach((item) => {
            const itemPath = path.join(dirPath, item);
            if (fs.lstatSync(itemPath).isDirectory()) {
                const subModules = processDirectory(itemPath);
                Object.assign(importedModules, subModules);
            }
            else if (item.endsWith('.ts') && !excludedFiles.includes(item)) {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const importedModule = require(itemPath);
                    Object.assign(importedModules, importedModule);
                }
                catch (error) {
                    logger_1.logger.error(`Error importing module from ${itemPath}: ${error}`);
                }
            }
        });
        return importedModules;
    };
    return processDirectory(folderPath);
};
exports.DaynamicImport = DaynamicImport;
