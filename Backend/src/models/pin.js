const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 
const User = require('./user');
const Collection = require('./collection');
const Pin = sequelize.define('pin', {
  pin_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
