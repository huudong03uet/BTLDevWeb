const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./user');

const Pen = sequelize.define('pen', {
    pen_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    html_code: {
        type: DataTypes.TEXT('long'),
    },

    js_code: {
        type: DataTypes.TEXT('long'),
    },
    css_code: {
        type: DataTypes.TEXT('long'),
    },
    name: {
        type: DataTypes.TEXT,
        defaultValue: "Untitled",
    },
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