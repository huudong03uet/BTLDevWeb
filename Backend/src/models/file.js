const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

import Project from './project';

const File = sequelize.define('file', {
  file_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  project_id: {
    type: DataTypes.INTEGER,
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
}, {
  tableName: 'file',
});


File.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = File;
