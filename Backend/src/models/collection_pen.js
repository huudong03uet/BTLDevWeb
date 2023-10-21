// penPenModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const Collection_pen = sequelize.define('collection_pen', {
  collection_pen_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
    tableName: "collection_pen",
});

module.exports = Colection_pen;
