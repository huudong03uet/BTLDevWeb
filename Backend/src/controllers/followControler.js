const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const Follow = require('../models/followTable');

async function _getFollowByUserID(user_id, attr_sort = "createdAt", sort_by = 'desc') {
    try {
        let getUser = await Follow.findAll({
            attributes: {
                include: [
                    [Sequelize.literal('(SELECT count(pen_id) FROM pen WHERE pen.user_id = follow_table.user_id_2)'), 'numpen'],
                ]
            },
            where: { user_id_1: user_id },
            order: [[attr_sort, sort_by]],
        });

        if (getUser.length > 0) {
            return getUser;
        } else {
            return []
        }
    } catch (error) {
        console.error('Get follow by id error:', error);
        throw error;
    }
}

module.exports = {
    _getFollowByUserID,
};