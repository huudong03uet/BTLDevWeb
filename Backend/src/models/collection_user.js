// userPenModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 
const User = require('./user'); // Đặt đường dẫn đến mô hình bảng "user"
const Collection = require('./collection'); // Đặt đường dẫn đến mô hình bảng "user"

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

Collection_user.belongsTo(Collection, { foreignKey: 'collection_id' });
Collection_user.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Collection_user;
