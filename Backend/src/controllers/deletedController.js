const CollectionPen = require('../models/collection_pen');
const Collection = require('../models/collection');
const Pen = require('../models/pen');
const commentTable = require('../models/commentTable');
const LikeCollectionTable = require('../models/likeCollection');
const LikeTable = require('../models/likeTable');
const viewTable = require('../models/viewTable');
const pinTable = require('../models/pin');
const fileTable = require('../models/file');
const folderTable = require('../models/folder');
const Project = require('../models/project');
const FollowTable = require('../models/followTable');
const User = require('../models/user');

const Sequelize = require('sequelize');
const Follow = require('../models/followTable');

async function _deleteProjectPermanently(project_id) {

  const project = await Project.findOne({ where: { project_id } });

  await commentTable.destroy({ where: { project_id } });
  await LikeTable.destroy({ where: { project_id } });
  await viewTable.destroy({ where: { project_id } });
  await fileTable.destroy({ where: { project_id } });
  await folderTable.destroy({ where: { project_id } });

  await project.destroy();
}

async function _deletePenPermanently(pen_id) {
  const pen = await Pen.findOne({ where: { pen_id } });

  await commentTable.destroy({ where: { pen_id } });
  await LikeTable.destroy({ where: { pen_id } });
  await viewTable.destroy({ where: { pen_id } });
  await pinTable.destroy({ where: { pen_id } });
  await CollectionPen.destroy({ where: { pen_id } });

  await pen.destroy();
}

async function _deleteCollectionPermanently(collection_id) {

  const collection = await Collection.findByPk(collection_id);

  await commentTable.destroy({ where: { collection_id } });
  await LikeCollectionTable.destroy({ where: { collection_id } });
  await CollectionPen.destroy({ where: { collection_id } });
  await viewTable.destroy({ where: { collection_id } });
  await pinTable.destroy({ where: { collection_id } });

  await collection.destroy();
}

async function deleteAssociatedRecords(user_id) {
  try {
    const pens = await Pen.findAll({ where: { user_id } });
    for (const pen of pens) {
      await _deletePenPermanently(pen.pen_id);
    }

    const collections = await Collection.findAll({ where: { user_id } });
    for (const collection of collections) {
      await _deleteCollectionPermanently(collection.collection_id);
    }

    const projects = await Project.findAll({ where: { user_id } });
    for (const project of projects) {
      await _deleteProjectPermanently(project.project_id);
    }
  } catch (error) {
    console.error('Error deleting associated records:', error);
    throw error;
  }
}

async function deleteUserPermanently(req, res) {
  const user_id = req.params.id;

  try {
    await Promise.all([
      commentTable.destroy({ where: { user_id: user_id } }),
      FollowTable.destroy({
        where: {
          [Sequelize.Op.or]: [
            { user_id_1: user_id },
            { user_id_2: user_id },
          ],
        },
      }),
      LikeTable.destroy({ where: { user_id } }),
      viewTable.destroy({ where: { user_id } }),
      pinTable.destroy({ where: { user_id } }),
    ]);

    await new Promise(resolve => setTimeout(resolve, 100));

    await deleteAssociatedRecords(user_id);

    await new Promise(resolve => setTimeout(resolve, 100));

    const userRowCount = await User.destroy({
      where: { user_id },
    });

    if (userRowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getDeletedCollectionsAndPens(req, res) {
  try {
    const { user_id } = req.body;

    const deletedPens = await Pen.findAll({
      where: { deleted: true, user_id },
      attributes: ['pen_id', 'name'],
    });

    const deletedCollections = await Collection.findAll({
      where: { deleted: true, user_id },
      attributes: ['collection_id', 'name'],
    });


    const deletedProjects = await Project.findAll({
      where: { deleted: true, user_id },
      attributes: ['project_id', 'name'],
    });

    const formattedCollections = deletedCollections.map(collection => ({
      id: collection.collection_id,
      name: collection.name,
      type: 'collection',
    }));

    const formattedPens = deletedPens.map(pen => ({
      id: pen.pen_id,
      name: pen.name,
      type: 'pen',
    }));

    const formattedProjects = deletedProjects.map(project => ({
      id: project.project_id,
      name: project.name,
      type: 'project',
    }));

    let result = formattedCollections.concat(formattedPens);
    result = result.concat(formattedProjects);

    return res.status(200).json({
      code: 200,
      deletedItems: result,
      message: 'Get a list of successfully deleted collections, pens and projects',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error while retrieving the list of deleted collections, pens and projects' });
  }
}

async function deletePenPermanently(req, res) {
  try {
    const { pen_id } = req.body;
    const pen = await Pen.findOne({ where: { pen_id } });

    if (!pen) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy pen hoặc pen chưa bị xóa' });
    }

    await commentTable.destroy({ where: { pen_id } });
    await LikeTable.destroy({ where: { pen_id } });
    await viewTable.destroy({ where: { pen_id } });
    await pinTable.destroy({ where: { pen_id } });
    await CollectionPen.destroy({ where: { pen_id } });

    await pen.destroy();

    return res.status(200).json({ code: 200, message: 'Pen deleted permanently successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error during pen deletion process' });
  }
}

async function deleteCollectionPermanently(req, res) {
  try {
    const { collection_id } = req.body;

    const collection = await Collection.findByPk(collection_id);

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }
    await commentTable.destroy({ where: { collection_id } });
    await LikeCollectionTable.destroy({ where: { collection_id } });
    await CollectionPen.destroy({ where: { collection_id } });
    await viewTable.destroy({ where: { collection_id } });
    await pinTable.destroy({ where: { collection_id } });

    await collection.destroy();

    return res.status(200).json({ code: 200, message: 'Collection deleted permanently successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error while deleting collection' });
  }
}


async function deleteProjectPermanently(req, res) {
  try {
    const { project_id } = req.body;
    const project = await Project.findOne({ where: { project_id } });

    if (!project) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy project hoặc project chưa bị xóa' });
    }

    await commentTable.destroy({ where: { project_id } });
    await LikeTable.destroy({ where: { project_id } });
    await viewTable.destroy({ where: { project_id } });
    await fileTable.destroy({ where: { project_id } });
    await folderTable.destroy({ where: { project_id } });

    // Use the destroy method with the correct condition
    await project.destroy();

    return res.status(200).json({ code: 200, message: 'Project deleted permanently successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error during project deletion' });
  }
}

module.exports = {
  getDeletedCollectionsAndPens,
  deletePenPermanently,
  deleteCollectionPermanently,
  deleteProjectPermanently,
  deleteUserPermanently,
};