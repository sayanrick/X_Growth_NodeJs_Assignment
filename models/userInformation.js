const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const UserInformation = sequelize.define('UserInformation', {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(UserInformation, { foreignKey: 'user_id' });
UserInformation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserInformation;
