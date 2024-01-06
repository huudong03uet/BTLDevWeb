const Sequelize = require('sequelize');

const Collection = require('../models/collection');
const CollectionPen = require('../models/collection_pen');
const User = require('../models/user');
import { _formatDateString } from "./userController";

async function createOrUpdateCollection(req, res) {
  try {
    const { name, user_id, penIds, isPublic } = req.body;
    const newCollection = await Collection.create({
      name: name,
      status: isPublic ? 'public' : 'private',
      user_id: user_id,
    });

    if (penIds && penIds.length > 0) {
      await CollectionPen.bulkCreate(penIds.map(penId => ({ collection_id: newCollection.collection_id, pen_id: penId })));
    }

    return res.status(201).json({ code: 201, collection: newCollection, message: 'Created collection successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error while creating or updating collection', detailedError: error.message });
  }
}

async function getCollectionsByUser(req, res) {
  try {
    const userId = req.params.userId;

    const collections = await Collection.findAll({
      where: { user_id: userId, deleted: false }, // Add condition for deleted: false
    });

    return res.status(200).json({ code: 200, collections, message: 'Get the collection list successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error while retrieving collection list' });
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
      message: 'Get the list of pens in the collection successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error while getting the list of pens in the collection' });
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
    res.status(500).json({ code: 500, error: 'Error while adding pen to collection' });
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

    // Check if penInCollection.pen is defined before accessing its properties
    if (penInCollection.pen && penInCollection.pen.deleted) {
      await CollectionPen.destroy({ where: { pen_id: pen_id } });
    }

    return res.status(200).json({ code: 200, message: 'Pen removed from collection successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error while deleting pen from collection' });
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
    res.status(500).json({ code: 500, error: 'Error while deleting collection' });
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
    res.status(500).json({ code: 500, error: 'Error while restoring collection' });
  }
}

async function getAllCollection(req, res) {
  const attr_sort = req.query.attr_sort
  const order_by = req.query.order_by;
  const deleted = req.query.deleted == '' ? false : (req.query.deleted == "true" ? true : false);

  try {
    let collections = await Collection.findAll({
      attributes: {
        include: [
          [Sequelize.literal('(SELECT user_name FROM user WHERE user.user_id = collection.user_id)'), 'user_name'],
          [Sequelize.literal('(SELECT count(like_id) FROM likeCollection WHERE likeCollection.collection_id = collection.collection_id AND likeCollection.type = "collection")'), 'numlike'],
          [Sequelize.literal('(SELECT count(view_id) FROM view_table WHERE view_table.collection_id = collection.collection_id AND view_table.type = "collection")'), 'numview'],
          [Sequelize.literal('(SELECT count(comment_id) FROM comment_table WHERE comment_table.collection_id = collection.collection_id AND comment_table.type = "collection")'), 'numcomment'],
        ],
      },
      where: { deleted: deleted },
      order: attr_sort != '' ? [[attr_sort, order_by || 'ASC']] : undefined,
    });

    collections = collections.map(collection => ({
      ...collection.toJSON(),
      id: collection.collection_id,
      name: (collection.name == null ? "Untitled" : collection.name),
      createdAtRaw: collection.createdAt,
      updatedAtRaw: collection.updatedAt,
      createdAt: _formatDateString(collection.createdAt),
      updatedAt: _formatDateString(collection.updatedAt),
    }));

    res.status(200).json(collections);
  } catch (error) {
    console.log("chan gai 808", error);
  }
}

async function addCollectionToCollection(req, res) {
  try {
    const { sourceCollectionId, targetCollectionId } = req.body;

    const sourceCollection = await Collection.findByPk(sourceCollectionId, {
      attributes: ['collection_id', 'name'],
      where: { deleted: false },
    });

    if (!sourceCollection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy source collection' });
    }

    const targetCollection = await Collection.findByPk(targetCollectionId, {
      attributes: ['collection_id', 'name'],
      where: { deleted: false },
    });

    if (!targetCollection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy target collection' });
    }

    // Get pen_ids from source collection
    const pensInSourceCollection = await CollectionPen.findAll({
      where: { collection_id: sourceCollectionId },
      attributes: ['pen_id'],
      include: [{
        model: Collection,
        attributes: [],
        where: { deleted: false },
      }],
    });

    for (const penInSource of pensInSourceCollection) {
      const penId = penInSource.pen_id;

      const penInTargetCollection = await CollectionPen.findOne({
        where: { collection_id: targetCollectionId, pen_id: penId },
      });

      if (!penInTargetCollection) {
        await CollectionPen.create({ collection_id: targetCollectionId, pen_id: penId });
      }
    }

    return res.status(200).json({ code: 200, message: 'Added pens from source collection to target collection successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error while adding pen from source collection to target collection' });
  }
}

async function checkCollectionStatus(req, res) {
  const collectionId = req.query.collection_id;

  try {
    const collection = await Collection.findByPk(collectionId, { where: { deleted: false } });

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    return res.status(200).json({ status: collection.status, message: 'Lấy trạng thái collection thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function toggleCollectionStatus(req, res) {
  try {
    const { collection_id } = req.body;

    const collection = await Collection.findByPk(collection_id);

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    const newStatus = collection.status === 'public' ? 'private' : 'public';

    // Set the 'status' property to the new status
    await collection.update({ status: newStatus });

    return res.status(200).json({ code: 200, message: `The state of the collection has been changed to ${newStatus}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Error during collection state transition' });
  }
}

async function getUserInfoByCollectionId(req, res) {
  try {
    const collectionId = req.params.collection_id;

    const collection = await Collection.findByPk(collectionId, {
      attributes: ['collection_id', 'user_id'],
      where: { deleted: false },
    });

    if (!collection) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy collection' });
    }

    const user = await User.findByPk(collection.user_id, {
      attributes: ['user_id', 'user_name'],
    });

    if (!user) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy người dùng' });
    }

    const userInfo = {
      user_id: user.user_id,
      user_name: user.user_name,
    };

    return res.status(200).json({
      code: 200,
      user: userInfo,
      message: 'Retrieve user information from collection successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      error: 'Error while retrieving user information from collection',
    });
  }
}

async function getCollectionByUserSort(req, res) {
  const { user_id, sortby } = req.query;

  try {
    let collections;
    if (sortby == "numlike" || sortby == "numview") {
      collections = await Collection.findAll({
        attributes: {
          include: [
            [Sequelize.literal('(SELECT count(like_id) FROM likeCollection WHERE collection.collection_id = likeCollection.collection_id)'), 'numlike'],
            [Sequelize.literal('(SELECT count(view_id) FROM view_table WHERE collection.collection_id = view_table.collection_id AND view_table.type = "collection")'), 'numview'],
          ]
        },
        where: { user_id: user_id },
        order: [[sortby, 'DESC']],
      })
    } else if (sortby == "private" || sortby == "public") {
      collections = await Collection.findAll({
        where: { user_id: user_id, status: sortby },
      })
    }

    res.status(200).json(collections)
  } catch (error) {
    console.log("simp gai 808:", error);
    console.error(error);
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
  getUserInfoByCollectionId,
  addCollectionToCollection,
  checkCollectionStatus,
  toggleCollectionStatus,
  getCollectionByUserSort,
}
