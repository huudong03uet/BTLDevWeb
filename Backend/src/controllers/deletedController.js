const Collection = require('../models/collection');
const Pen = require('../models/pen');

async function getDeletedCollectionsAndPens(req, res) {
  try {
    const deletedCollections = await Collection.findAll({
      where: { deleted: true },
      attributes: ['collection_id', 'name'],
    });

    const deletedPens = await Pen.findAll({
      where: { deleted: true },
      attributes: ['pen_id', 'name'],
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

    const result = formattedCollections.concat(formattedPens);

    return res.status(200).json({
      code: 200,
      deletedItems: result,
      message: 'Lấy danh sách collection và pen đã xóa thành công',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy danh sách collection và pen đã xóa' });
  }
}

module.exports = {
  getDeletedCollectionsAndPens,
};
