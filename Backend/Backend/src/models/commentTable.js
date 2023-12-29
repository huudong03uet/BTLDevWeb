const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Đặt đường dẫn đến kết nối Sequelize của bạn

const Comment = sequelize.define('comment_table', {
  comment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pen_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Các cột khác cho bảng 'comment'
}, {
  tableName: "comment_table",
});

module.exports = Comment;
