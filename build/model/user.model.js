"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = require("bcrypt");
const userModel = (sequelize) => {
    const userModel = sequelize.define('user_details', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.ENUM,
            allowNull: false,
            values: ['0', '1', '2'],
        },
    }, {
        paranoid: true,
    });
    userModel.afterValidate((data) => {
        if (data.changed('password')) {
            data.password = (0, bcrypt_1.hashSync)(data.password, (0, bcrypt_1.genSaltSync)(12));
        }
    });
    userModel.prototype.authenticate = function (val) {
        if ((0, bcrypt_1.compareSync)(val, this.password)) {
            return this;
        }
        else {
            return false;
        }
    };
    // userModel.associate = (models) => {
    //     userModel.hasMany(models, {});
    // };
    return userModel;
};
exports.userModel = userModel;
