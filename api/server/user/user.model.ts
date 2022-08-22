const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://vzuxbsfz:B310ibThA1p7za4U_mHX8nHYxVIdR_XP@jelani.db.elephantsql.com/vzuxbsfz') 

export const User = sequelize.define('User', {
  // Model attributes are defined here
	id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
  // Other model options go here
});