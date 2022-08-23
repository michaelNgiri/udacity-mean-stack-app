"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://vzuxbsfz:B310ibThA1p7za4U_mHX8nHYxVIdR_XP@jelani.db.elephantsql.com/vzuxbsfz');
exports.Link = sequelize.define('Link', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    original_link: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    short_link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link_owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
// Other model options go here
});
