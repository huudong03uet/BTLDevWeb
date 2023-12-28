const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./user');

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
    type_css: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'css',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'public',
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    tableName: "pen",
});

Pen.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Pen;