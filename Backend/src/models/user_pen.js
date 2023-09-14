// userPenModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Đặt đường dẫn đến kết nối Sequelize của bạn
const User = require('./user'); // Đặt đường dẫn đến mô hình bảng "user"
const Pen = require('./pen'); // Đặt đường dẫn đến mô hình bảng "pen"

const UserPen = sequelize.define('user_pen', {
  user_pen_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
    tableName: "user_pen",
});

// Tạo mối quan hệ giữa "UserPen" và "User"
UserPen.belongsTo(User, { foreignKey: 'user_id' });
// Tạo mối quan hệ giữa "UserPen" và "Pen"
UserPen.belongsTo(Pen, { foreignKey: 'pen_id' });

module.exports = UserPen;
