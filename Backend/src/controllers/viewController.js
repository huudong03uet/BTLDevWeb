const express = require('express');
const View = require('../models/viewTable');
const { Op } = require('sequelize');
const router = express.Router();

async function _getViewByPen(pen_id) {
    try {
        const view = await View.findAll({
            where: { pen_id: pen_id },
        });
        return view;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    _getViewByPen,
};