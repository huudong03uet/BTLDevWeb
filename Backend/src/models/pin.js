const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const User = require('./user');
const Pen = require('./pen');
const Collection = require('./collection');
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
  },

}, {
    tableName: "pin",
});

Pin.belongsTo(User, { foreignKey: 'user_id' });
Pin.belongsTo(Collection, { foreignKey: 'collection_id' })
Pin.belongsTo(Pen, { foreignKey: 'pen_id' })

module.exports = Pin;