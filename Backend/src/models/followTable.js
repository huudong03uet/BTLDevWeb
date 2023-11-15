const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 
const User = require('./user');

const Follow = sequelize.define('follow_table', {
  follow_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id_1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id_2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "follow_table",
});

Follow.belongsTo(User, { foreignKey: 'user_id_1' })
Follow.belongsTo(User, { foreignKey: 'user_id_2' })

module.exports = Follow;
