// models/collection.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./user');

const Collection = sequelize.define('collection', {
  collection_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'public',
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'collection',
});

Collection.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Collection;
