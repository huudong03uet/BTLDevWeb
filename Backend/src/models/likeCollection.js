const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Collection = require('./collection');
const User = require('./user');
const express = require('express');

const LikeCollection = sequelize.define('likeCollection', {
    like_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
    collection_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        tableName: 'likeCollection',
    });

LikeCollection.belongsTo(Collection, { foreignKey: 'collection_id' });
LikeCollection.belongsTo(User, { foreignKey: 'user_id' });

module.exports = LikeCollection;
