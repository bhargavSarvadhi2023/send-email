"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpModel = void 0;
const sequelize_1 = require("sequelize");
const otpModel = (sequelize) => {
    const otpModel = sequelize.define('otp_details', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        is_verified: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        paranoid: true,
    });
    // userModel.associate = (models) => {
    //     userModel.hasMany(models, {});
    // };
    return otpModel;
};
exports.otpModel = otpModel;
