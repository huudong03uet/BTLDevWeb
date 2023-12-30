const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    avatar_path: DataTypes.TEXT,
    user_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    gmail: DataTypes.TEXT,
    password: DataTypes.TEXT,
    full_name: DataTypes.TEXT,
    location: {
        type: DataTypes.TEXT,
        allowNull: false,
    },  
    bio: DataTypes.TEXT,        
    links: DataTypes.JSON,      
}, {
    tableName: 'user',
});

module.exports = User;
