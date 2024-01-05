const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = require('./user');
const Pen = require('./pen')
const Collection = require('./collection')
const Project = require('./project');

const View = sequelize.define('view_table', {
    view_id: {
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
View.belongsTo(Collection, { foreignKey: 'collection_id' })
View.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = View;
