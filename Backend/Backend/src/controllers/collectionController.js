const Collection = require('../models/collection');
const CollectionPen = require('../models/collection_pen');

async function createOrUpdateCollection(req, res) {
  try {
    const { collection_id, name, pen_ids } = req.body;

    if (collection_id) {
      const [updatedRows] = await Collection.update({ name }, { where: { collection_id } });

      if (updatedRows === 0) {
        return res.status(404).json({ code: 404, message: 'Không tìm thấy collection để cập nhật' });
      }

      if (pen_ids && pen_ids.length > 0) {
        await CollectionPen.destroy({ where: { collection_id } });
        await CollectionPen.bulkCreate(pen_ids.map(pen_id => ({ collection_id, pen_id })));
      }

      const updatedCollection = await Collection.findByPk(collection_id);
      return res.status(200).json({ code: 200, collection: updatedCollection, message: 'Cập nhật collection thành công' });
    } else {
      const newCollection = await Collection.create({ name });

      if (pen_ids && pen_ids.length > 0) {
        await CollectionPen.bulkCreate(pen_ids.map(pen_id => ({ collection_id: newCollection.collection_id, pen_id })));
      }

      return res.status(201).json({ code: 201, collection: newCollection, message: 'Tạo mới collection thành công' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Lỗi trong quá trình tạo hoặc cập nhật collection' });
  }
}

module.exports = {
  createOrUpdateCollection,
};
