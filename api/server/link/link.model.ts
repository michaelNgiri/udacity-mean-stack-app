const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://vzuxbsfz:B310ibThA1p7za4U_mHX8nHYxVIdR_XP@jelani.db.elephantsql.com/vzuxbsfz') 

export const Link = sequelize.define('User', {
  // Model attributes are defined here
	id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  original_link: {
    type: DataTypes.STRING,
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
