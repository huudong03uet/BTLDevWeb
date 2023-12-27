// penPenModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const CollectionPen = sequelize.define(
  'CollectionPen', // Đặt tên đúng định dạng PascalCase
  {
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
    },
  },
  {
    tableName: 'collection_pen',
    // Thêm các tùy chọn khác nếu cần
  }
);

module.exports = CollectionPen;
