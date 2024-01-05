const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

import Project from "./project";

const Folder = sequelize.define('folder', {
    folder_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        onUpdate: DataTypes.NOW,
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'folder',
});

Folder.belongsTo(Project, { foreignKey: 'project_id' });


module.exports = Folder;

