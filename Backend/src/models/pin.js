const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 
const User = require('./user');

const Pin = sequelize.define('pin', {
  pin_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pen",
  }
}, {
    tableName: "pin",
});

Pin.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Pin;