// penModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Đặt đường dẫn đến kết nối Sequelize của bạn

const Pen = sequelize.define('pen', {
  pen_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  html_code: DataTypes.TEXT,
  js_code: DataTypes.TEXT,
  css_code: DataTypes.TEXT,
  name: DataTypes.TEXT,
}, {
    tableName: "pen",
});

module.exports = Pen;
