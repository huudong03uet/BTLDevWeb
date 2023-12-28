const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = require('./user');
const Pen = require('./pen')

const View = sequelize.define('view_table', {
    like_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pen",
    }
},
    {
        tableName: 'view_table',
    }
);

View.belongsTo(User, { foreignKey: 'user_id' })
View.belongsTo(Pen, { foreignKey: 'pen_id' })

module.exports = View;