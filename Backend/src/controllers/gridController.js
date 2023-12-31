const Sequelize = require('sequelize');
const { Op } = require("sequelize");
import View from '../models/viewTable';
import Like from '../models/likeTable';
import Pin from '../models/pin';
import Follow from '../models/followTable';
import Pen from '../models/pen';
import User from '../models/user';


let updateView = async (req, res) => {
    try {
        const { userId, penId } = req.body;
        // console.log(userId);
        // console.log(penId);
        const [view, created] = await View.findOrCreate({
            where: {
                user_id: userId,
                pen_id: penId,
            },
            defaults: {}, 
        });

        if (created) {
            res.status(200).json({ message: "Thành công" });
        } else {
            res.status(200).json({ message: "Đã xem trước đó" });
        }
    } catch (error) {
        console.error('Error updating view:', error);
        res.status(500).json({ error: 'Lỗi khi cập nhật xem trước' });
    }
}

let handleLike = async (req, res) => {
    const pen_id = req.query.pen_id;
    const user_id = req.query.user_id;
    const type = req.query.type;
    try {
        // Kiểm tra xem người dùng đã like pen đó chưa
        const existingLike = await Like.findOne({
            where: {
                pen_id: pen_id,
                user_id: user_id,
                type: type
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
                user_id: user_id,
                type: type
            });
            res.status(200).json({ liked: true });
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error handling like');
    }
}


let handlePin = async (req, res) => {
    const { user_id, pen_id, type } = req.query;
  
    try {
      const existingPin = await Pin.findOne({
        where: {
          user_id,
          pen_id,
          type
        },
      });
  
      if (existingPin) {
        // Nếu đã có trong Pin, xóa nó
        await existingPin.destroy();
        res.status(200).json({ pinned: false });
      } else {
        // Nếu chưa có trong Pin, thêm vào Pin
        await Pin.create({
          user_id,
          pen_id,
          type
        });
        res.status(200).json({ pinned: true });
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
      // console.log(penId);
      const pen = await Pen.findByPk(penId);
  
      if (!pen) {
        return res.status(404).json({ error: 'Pen not found' });
      }
      let userPen = null
      if(pen.user_id !== null) {
        userPen = await User.findOne({
          where: { user_id: pen.user_id}
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
        followed: followRecord!=null,
        pined: pinRecord!=null
      };
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

module.exports = {
    updateView, handleLike, handlePin, handleFollow, getInfoGrid
};
