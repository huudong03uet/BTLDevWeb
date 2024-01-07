const Collection = require('../models/collection');
const CollectionPen = require('../models/collection_pen');
const Pen = require('../models/pen');
const { Op } = require('sequelize');

import { getPensInCollection } from './collectionController';

async function _getPen(search) {
    try {
        const pens = await Pen.findAll({
            where: {
                [Op.or]: [
                    { html_code: { [Op.like]: `%${search}%` } },
                    { js_code: { [Op.like]: `%${search}%` } },
                    { css_code: { [Op.like]: `%${search}%` } },
                    { name: { [Op.like]: `%${search}%` } },
                ],
            },
        });

        return pens;
    } catch (error) {
        throw error
    }
}

async function getPenIDWithSearch(req, res) {
    const search = req.query.q;

    try {
        let pen = await _getPen(search)

        pen = pen.map(pen => pen.pen_id);

        res.status(200).json(pen)
    } catch (e) {
        console.error('Error search pens:', error);
    }
}

async function _getAllCollection() {
    try {
        const data = Collection.findAll();

        return data;
    } catch (error) {

    }
}


async function _getAllPensIDInCollection(collection_id) {
    try {
        const pens = await CollectionPen.findAll({
            where: { collection_id: collection_id },
            attributes: ['pen_id'],
            include: [{
                model: Collection,
                attributes: [],
                where: { deleted: false },
            }],
        });

        return pens;
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, error: 'Error while getting the list of pens in the collection' });
    }
}

async function getCollectionIDWithSearch(req, res) {
    const search = req.query.q;
    try {
        let allCollection = await _getAllCollection();

        let searchOfPen = await _getPen(search);

        let collections = [];

        for (let collection of allCollection) {
            try {
                let pen_ids = await _getAllPensIDInCollection(collection.dataValues.collection_id)

                let pensInSearch = pen_ids.filter(pen_id => searchOfPen.some(pen => pen.pen_id === pen_id.dataValues.pen_id));

                if (pensInSearch.length > 0) {
                    collections.push(collection.dataValues);
                }
            } catch (e) {
                continue;
            }

        }

        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ code: 500, error: 'ối giời ơi lỗi rồi' });
    }
}

const Project = require('../models/project')
async function getProjectIDWithSearch(req, res) {
    const search = req.query.q;

    try {
        let projects = await Project.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                ],
            },
        });

        // projects = projects.map(x => x);

        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json('loi')
    }
}

module.exports = {
    getPenIDWithSearch,
    getCollectionIDWithSearch,
    getProjectIDWithSearch,
};

