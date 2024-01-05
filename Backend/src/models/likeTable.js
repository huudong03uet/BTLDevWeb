const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = require('./user');
const Pen = require('./pen')
const Project = require('./project');

const Like = sequelize.define('like_table', {
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
        tableName: 'like_table',
    }
);

Like.belongsTo(User, { foreignKey: 'user_id' })
Like.belongsTo(Pen, { foreignKey: 'pen_id' })
Like.belongsTo(Project, { foreignKey: 'project_id' })

module.exports = Like;