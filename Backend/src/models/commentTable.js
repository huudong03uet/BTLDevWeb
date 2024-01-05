const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = require('./user');
const Pen = require('./pen');
const Collection = require('./collection');
const Project = require('./project');

const Comment = sequelize.define('comment_table', {
    comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pen",
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},
    {
        tableName: 'comment_table',
    }
);

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Pen, { foreignKey: 'pen_id' });
Comment.belongsTo(Collection, { foreignKey: 'collection_id' })
Comment.belongsTo(Comment, { foreignKey: 'reply' })
Comment.belongsTo(Project, { foreignKey: 'project_id' })

module.exports = Comment;