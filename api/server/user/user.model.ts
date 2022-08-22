const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://vzuxbsfz:B310ibThA1p7za4U_mHX8nHYxVIdR_XP@jelani.db.elephantsql.com/vzuxbsfz') 

export const User = sequelize.define('User', {
  // Model attributes are defined here
	id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
	},
   email: {
    type: DataTypes.STRING
    // allowNull defaults to true
	},
   phone: {
    type: DataTypes.STRING
    // allowNull defaults to true
}
}, {
  // Other model options go here
});