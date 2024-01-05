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

async function getDeletedCollectionsAndPens(req, res) {
  try {
    const { user_id } = req.body;

    const deletedCollections = await Collection.findAll({
      where: { deleted: true, user_id },
      attributes: ['collection_id', 'name'],
    });

    const deletedPens = await Pen.findAll({
      where: { deleted: true, user_id },
      attributes: ['pen_id', 'name'],
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
      message: 'Lấy danh sách collection, pen và project đã xóa thành công',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy danh sách collection, pen và project đã xóa' });
  }
}


async function deletePenPermanently(req, res) {
  try {
    const { pen_id } = req.body;
    const pen = await Pen.findOne({ where: { pen_id, deleted: true } });

    if (!pen) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy pen hoặc pen chưa bị xóa' });
    }

    await commentTable.destroy({ where: { pen_id } });
    await LikeTable.destroy({ where: { pen_id } });
    await viewTable.destroy({ where: { pen_id } });
    await pinTable.destroy({ where: { pen_id } });
    await pen.destroy();

    return res.status(200).json({ code: 200, message: 'Pen deleted permanently successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình xóa pen' });
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
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình xóa collection' });
  }
}

async function deleteProjectPermanently(req, res) {
  try {
    const { project_id } = req.body;
    const project = await Project.findOne({ where: { project_id, deleted: true } });

    if (!project) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy project hoặc project chưa bị xóa' });
    }

    await commentTable.destroy({ where: { project_id } });
    await LikeTable.destroy({ where: { project_id } });
    await viewTable.destroy({ where: { project_id } });
    await fileTable.destroy({ where: { project_id } });
    await folderTable.destroy({ where: { project_id } });
    await pinTable.destroy({ where: { project_id } });

    await Project.destroy();

    return res.status(200).json({ code: 200, message: 'project deleted permanently successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình xóa project' });
  }
}


module.exports = {
  getDeletedCollectionsAndPens,
  deletePenPermanently,
  deleteCollectionPermanently,
  deleteProjectPermanently,
};