const Sequelize = require('sequelize');

const Collection = require('../models/collection');
const CollectionPen = require('../models/collection_pen');

import { _formatDateString } from "./userController";

async function createOrUpdateCollection(req, res) {
  try {
    const { name, user_id, penIds, isPublic } = req.body;
    const newCollection = await Collection.create({
      name : name,
      status: isPublic ? 'public' : 'private',
      user_id: user_id,
    });

    if (penIds && penIds.length > 0) {
      await CollectionPen.bulkCreate(penIds.map(penId => ({ collection_id: newCollection.collection_id, pen_id: penId })));
    }

    return res.status(201).json({ code: 201, collection: newCollection, message: 'Tạo mới collection thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình tạo hoặc cập nhật collection', detailedError: error.message });
  }
}

async function getCollectionsByUser(req, res) {
  try {
    const userId = req.params.userId;

    const collections = await Collection.findAll({
      where: { user_id: userId, deleted: false }, // Add condition for deleted: false
    });

    return res.status(200).json({ code: 200, collections, message: 'Lấy danh sách collection thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy danh sách collection' });
  }
}

async function getPensInCollection(req, res) {
  try {
    const collectionId = req.params.collectionId;

    const collection = await Collection.findByPk(collectionId, {
      attributes: ['collection_id', 'name'],
      where: { deleted: false }, // Add condition for deleted: false
    });

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    const pens = await CollectionPen.findAll({
      where: { collection_id: collectionId },
      attributes: ['pen_id'],
      include: [{
        model: Collection,
        attributes: [],
        where: { deleted: false }, // Add condition for deleted: false
      }],
    });

    return res.status(200).json({
      code: 200,
      collection: {
        collection_id: collection.collection_id,
        name: collection.name,
      },
      pen_ids: pens.map(pen => pen.pen_id),
      collectionName: collection.name,
      message: 'Lấy danh sách pen trong collection thành công',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy danh sách pen trong collection' });
  }
}

async function addPenToCollection(req, res) {
  try {
    const { collection_id, pen_id } = req.body;

    const collection = await Collection.findByPk(collection_id);

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    const penInCollection = await CollectionPen.findOne({
      where: { collection_id: collection_id, pen_id: pen_id },
    });

    if (penInCollection) {
      return res.status(400).json({ code: 400, message: 'Pen already exists in the collection' });
    }

    await CollectionPen.create({ collection_id, pen_id });

    return res.status(200).json({ code: 200, message: 'Pen added to collection successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình thêm pen vào collection' });
  }
}

async function removePenFromCollection(req, res) {
  try {
    const { collection_id, pen_id } = req.body;

    const collection = await Collection.findByPk(collection_id);

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    const penInCollection = await CollectionPen.findOne({
      where: { collection_id: collection_id, pen_id: pen_id },
    });

    if (!penInCollection) {
      return res.status(400).json({ code: 400, message: 'Pen not found in the collection' });
    }

    await penInCollection.destroy();

    if (penInCollection.pen.deleted) {
      await CollectionPen.destroy({ where: { pen_id: pen_id } });
    }

    return res.status(200).json({ code: 200, message: 'Pen removed from collection successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình xóa pen khỏi collection' });
  }
}

async function removeCollection(req, res) {
  try {
    const { collection_id } = req.body;

    const collection = await Collection.findByPk(collection_id);

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    // Set the 'deleted' property to true
    await collection.update({ deleted: true });

    return res.status(200).json({ code: 200, message: 'Collection deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình xóa collection' });
  }
}

async function restoreCollection(req, res) {
  try {
    const { collection_id } = req.body;

    const collection = await Collection.findByPk(collection_id);

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    if (!collection.deleted) {
      return res.status(200).json({ code: 200, message: 'Collection is not deleted' });
    }

    // Set the 'deleted' property to false to restore the collection
    await collection.update({ deleted: false });

    return res.status(200).json({ code: 200, message: 'Collection restored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình khôi phục collection' });
  }
}

async function getAllCollection(req, res) {
  const attr_sort = req.query.attr_sort
  const order_by = req.query.order_by;
  const deleted = req.query.deleted == ''? false: (req.query.deleted == "true"? true: false);

  console.log(req.query)

  try {
    let collections = await Collection.findAll({
      attributes: {
        include: [
          [Sequelize.literal('(SELECT user_name FROM user WHERE user.user_id = collection.user_id)'), 'user_name'],
        ],
      },
      where: {deleted: deleted},
      order: attr_sort != '' ? [[attr_sort, order_by || 'ASC']] : undefined,
    });

    collections = collections.map(collection => ({
      ...collection.toJSON(),
      id: collection.collection_id,
      name: (collection.name == null ? "Untitled": collection.name),
      createdAt: _formatDateString(collection.createdAt),
      updatedAt: _formatDateString(collection.updatedAt),
    }));
    
    res.status(200).json(collections);
  } catch (error) {
    console.log("chan gai 808", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  createOrUpdateCollection,
  getCollectionsByUser,
  getPensInCollection,
  addPenToCollection,
  removePenFromCollection,
  removeCollection,
  restoreCollection,
  getAllCollection,

};
