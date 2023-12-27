const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./user');
const Collection = require('./collection');

const Collection_user = sequelize.define('collection_user', {
  collection_user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  collection_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "collection_user",
});

Collection_user.belongsTo(Collection, { foreignKey: 'collection_id' });
Collection_user.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Collection_user;
