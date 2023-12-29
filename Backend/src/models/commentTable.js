const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = require('./user');
const Pen = require('./pen');
const Collection = require('./collection');

const Comment = sequelize.define('comment_table', {
    comment_table_id: {
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
    }
},
    {
        tableName: 'comment_table',
    }
);

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Pen, { foreignKey: 'pen_id' });
Comment.belongsTo(Collection, { foreignKey: 'collection_id' })

module.exports = Comment;