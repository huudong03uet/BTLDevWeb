// userPenModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Đặt đường dẫn đến kết nối Sequelize của bạn
const User = require('./user'); // Đặt đường dẫn đến mô hình bảng "user"
const Pen = require('./pen'); // Đặt đường dẫn đến mô hình bảng "pen"
const Like = require('./likeTable');

const UserPen = sequelize.define('user_pen', {
  user_pen_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
    tableName: "user_pen",
});

UserPen.belongsTo(User, { foreignKey: 'user_id' });
UserPen.belongsTo(Pen, { foreignKey: 'pen_id' });

module.exports = UserPen;
