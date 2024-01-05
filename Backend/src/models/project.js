const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
;
import User from './user';

const Project = sequelize.define('project', {
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'project',
});


Project.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Project;
