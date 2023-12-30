const express = require('express');
const Like = require('../models/likeTable');
const { Op } = require('sequelize');
const router = express.Router();

async function _getLikeByuserID(user_id) {
    try {
        const like = await Like.findAll({
            where: { user_id: user_id },
        });
        return like;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    _getLikeByuserID,
};