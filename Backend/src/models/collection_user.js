// userPenModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const Collection_user = sequelize.define('collection_user', {
  collection_user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
    tableName: "collection_user",
});

module.exports = Collection_user;
