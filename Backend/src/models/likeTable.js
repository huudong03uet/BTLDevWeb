const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Đặt đường dẫn đến kết nối Sequelize của bạn
const User = require('./user');
const Pen = require('./pen');

const Like = sequelize.define('like_table', {
  like_id: {
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
}, {
  tableName: "like_table",
});

Like.belongsTo(User, { foreignKey: 'user_id' })
Like.belongsTo(Pen, { foreignKey: 'pen_id' })

module.exports = Like;
