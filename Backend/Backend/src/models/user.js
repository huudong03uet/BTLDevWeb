// userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Đặt đường dẫn đến kết nối Sequelize của bạn

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar_path: DataTypes.TEXT,
  user_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gmail: DataTypes.TEXT,
  password: DataTypes.TEXT,
  full_name: DataTypes.TEXT
}, {
  tableName: 'user',
});

module.exports = User;
