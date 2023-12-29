const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const Follow = require('../models/followTable');

async function getFollowByUserID(user_id) {
    try {
        const getUser = await Follow.findAll({
            where: { user_id_1: user_id },
        });

        if (getUser) {
            const userIDs = getUser.map((user) => user.user_id_2);
            return userIDs;
        } else {
            return []
        }
    } catch (error) {
        console.error('Get follow by id error:', error);
        throw error;
    }
}

module.exports = {
    getFollowByUserID,
};