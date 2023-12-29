const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const User = require('./user');
const Collection = require('./collection');
const Pen = require('./pen');
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
  },

}, {
    tableName: "pin",
});

Pin.belongsTo(User, { foreignKey: 'user_id' });
Pin.belongsTo(Collection, { foreignKey: 'collection_id' })
Pin.belongsTo(Pen, { foreignKey: 'pen_id' })

module.exports = Pin;
