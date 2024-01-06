const Sequelize = require('sequelize');
const { Op } = require("sequelize");
import View from '../models/viewTable';
import Like from '../models/likeTable';
import Pin from '../models/pin';
import Follow from '../models/followTable';
import Pen from '../models/pen';
import User from '../models/user';
import Collection from '../models/collection';


let updateView = async (req, res) => {
  try {
    const { userId, penId } = req.body;
    const [view, created] = await View.findOrCreate({
      where: {
        user_id: userId,
        pen_id: penId,
      },
      defaults: {},
    });

    if (created) {
      res.status(200).json({ message: "Successful" });
    } else {
      res.status(200).json({ message: "Seen" });
    }
  } catch (error) {
    console.error('Error updating view:', error);
    res.status(500).json({ error: 'Error while updating view' });
  }
}

let handleLike = async (req, res) => {
  const { pen_id, project_id, user_id, type } = req.query;

  try {
    // Kiểm tra xem người dùng đã like pen hoặc project đó chưa
    const existingLike = await Like.findOne({
      where: {
        [Op.or]: [
          (pen_id && { pen_id: pen_id, user_id: user_id, type: type }),
          (project_id && { project_id: project_id, user_id: user_id, type: type })
        ].filter(Boolean)
      }
    });

    if (existingLike) {
      // Nếu đã like rồi, thì bỏ like (xóa)
      await existingLike.destroy();
      res.status(200).json({ liked: false });
    } else {
      // Nếu chưa like, thêm mới (like)
      await Like.create({
        pen_id: pen_id,
        project_id: project_id,
        user_id: user_id,
        type: type
      });
      res.status(200).json({ liked: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error handling like' });
  }
}


let _handlePinPen = async (user_id, pen_id) => {
  try {
    const existingPin = await Pin.findOne({
      where: {
        user_id: user_id,
        pen_id: pen_id,
        type: "pen"
      },
    });

    if (existingPin) {
      await existingPin.destroy();
      return false;
    } else {
      // Nếu chưa có trong Pin, thêm vào Pin
      await Pin.create({
        user_id: user_id,
        pen_id: pen_id,
        type: "pen"
      });
      return true;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

let _handlePinCollection = async (user_id, collection_id) => {
  try {
    const existingPin = await Pin.findOne({
      where: {
        user_id: user_id,
        collection_id: collection_id,
        type: "collection"
      },
    });

    if (existingPin) {
      await existingPin.destroy();
      return false;
    } else {
      // Nếu chưa có trong Pin, thêm vào Pin
      await Pin.create({
        user_id: user_id,
        collection_id: collection_id,
        type: "collection"
      });
      return true;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


let handlePin = async (req, res) => {
  const { user_id, id, type } = req.query;

  try {

    if (type == "pen") {
      let x = await _handlePinPen(user_id, id);
      res.status(200).json({ pinned: x });
    } else if (type == "collection") {
      let x = await _handlePinCollection(user_id, id);
      res.status(200).json({ pinned: x });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const handleFollow = async (req, res) => {
  const user_id_1 = req.query.user_id_1; // ID của người thực hiện follow
  const user_id_2 = req.query.user_id_2; // ID của người được follow

  try {
    // Kiểm tra xem đã follow chưa
    const existingFollow = await Follow.findOne({
      where: {
        user_id_1,
        user_id_2,
      },
    });

    if (existingFollow) {
      // Nếu đã follow, thì unfollow
      await Follow.destroy({
        where: {
          user_id_1,
          user_id_2,
        },
      });

      res.status(200).json({ followed: false });
    } else {
      // Nếu chưa follow, thì follow
      await Follow.create({
        user_id_1,
        user_id_2,
      });

      res.status(200).json({ followed: true });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


async function getInfoGrid(req, res) {

  const penId = req.query.pen_id;
  const user_id = req.query.user_id;
  try {
    const pen = await Pen.findByPk(penId);

    if (!pen) {
      return res.status(404).json({ error: 'Pen not found' });
    }
    let userPen = null
    if (pen.user_id !== null) {
      userPen = await User.findOne({
        where: { user_id: pen.user_id }
      });
    }

    // Kiểm tra liệu người dùng đã ghim pen hay không
    const pinRecord = await Pin.findOne({
      where: {
        user_id: user_id,
        pen_id: penId,
        type: 'pen', // Chắc chắn rằng type là 'pen'
      },
    });

    // Kiểm tra liệu người dùng đã theo dõi người tạo pen hay không
    const followRecord = await Follow.findOne({
      where: {
        user_id_1: user_id, // Người dùng hiện tại
        user_id_2: pen.user_id, // Người tạo pen
      },
    });

    const result = {
      followed: followRecord != null,
      pined: pinRecord != null
    };

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

let handlePinPen = async (user_id, pen_id) => {
  try {
    const existingPin = await Pin.findOne({
      where: {
        user_id: user_id,
        pen_id: pen_id,
        type: "pen"
      },
    });

    if (existingPin) {
      await existingPin.destroy();
      res.status(200).json({ pinned: false });
    } else {
      // Nếu chưa có trong Pin, thêm vào Pin
      await Pin.create({
        user_id: user_id,
        pen_id: pen_id,
        type: "pen"
      });
      res.status(200).json({ pinned: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

let handlePinCollection = async (user_id, collection_id) => {
  try {
    const existingPin = await Collection.findOne({
      where: {
        user_id: user_id,
        collection_id: collection_id,
        type: "collection"
      },
    });

    if (existingPin) {
      await existingPin.destroy();
      return false;
    } else {
      // Nếu chưa có trong Pin, thêm vào Pin
      await Pin.create({
        user_id: user_id,
        collection_id: collection_id,
        type: "collection"
      });
      return true;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const checkFollowStatus = async (req, res) => {
  const { user_id_1, user_id_2 } = req.query;

  try {
    const existingFollow = await Follow.findOne({
      where: {
        [Op.and]: [
          { user_id_1 },
          { user_id_2 },
        ],
      },
    });

    res.status(200).json({ followed: !!existingFollow });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkLikeStatus = async (req, res) => {
  const { pen_id, project_id, user_id, type } = req.query;

  try {
    const existingLike = await Like.findOne({
      where: {
        [Op.or]: [
          (pen_id && { pen_id, user_id, type }),
          (project_id && { project_id, user_id, type }),
        ].filter(Boolean),
      },
    });

    res.status(200).json({ liked: !!existingLike });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  updateView,
  handleLike,
  handlePin,
  handleFollow,
  getInfoGrid,
  handlePinPen,
  handlePinCollection,
  checkFollowStatus,
  checkLikeStatus,
};