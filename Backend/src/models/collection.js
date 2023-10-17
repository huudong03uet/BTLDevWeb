// userPenModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const Collection = sequelize.define('collection', {
  collection_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
    tableName: "collection",
});

module.exports = Collection;
