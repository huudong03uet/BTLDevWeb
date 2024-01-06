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
            where: { user_id_1: user_id, },
            having: { numpen: { [Op.not]: 0 } },
            order: [[attr_sort, sort_by]],
        });

        if (getUser.length > 0) {
            getUser = getUser.map(x => x.user_id_2);
            return getUser;
        } else {
            return []
        }
    } catch (error) {
        console.error('Get follow by id error:', error);
        throw error;
    }
}

const Pen = require('../models/pen');
async function _getPenByUserID(user_id) {
    try {
        const pen = await Pen.findAll({
            where: { user_id: user_id, deleted: false },
            attributes: ['pen_id']
        });
        const penIdValues = pen.map((pen) => pen.pen_id);
        return penIdValues;
    } catch (error) {
        console.error(error);
        throw e;
    }
}

async function getFollow(req, res) {
    const user_id = req.query.user_id;
    const x = req.query.x;

    let attr_sort = "createdAt";
    let sort_by = 'desc';

    if (x != '') {
        attr_sort = 'numpen';
        sort_by = 'desc';
    }

    try {
        let usersFollow = await _getFollowByUserID(user_id, attr_sort = attr_sort, sort_by = sort_by);
        let pens = [];
        for (let user of usersFollow) {
            let x = await _getPenByUserID(user);
            pens.push(...x);
        }

        res.status(200).json(pens);
    } catch (error) {
        console.log(error);
        res.status(500).json("sao lai loi the")
    }
}

import { getAllUserExclude } from './userController'

async function getNotFollow(req, res) {
    const user_id = req.query.user_id;

    try {
        let usersFollow = await _getFollowByUserID(user_id);

        usersFollow.push(user_id);

        let usersNotFollow = await getAllUserExclude(usersFollow);

        usersNotFollow = [...new Set(usersNotFollow)];

        res.status(200).json(usersNotFollow);
    } catch (error) {
        console.log(error);
        res.status(500).json("sao lai loi the")
    }
}

module.exports = {
    _getFollowByUserID,
    getFollow,
    getNotFollow,
};