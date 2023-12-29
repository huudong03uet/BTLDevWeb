const Sequelize = require('sequelize');
const { Op } = require("sequelize");

import User from "../models/user";
import Pen from "../models/pen";
import User_Pen from "../models/user_pen";
import View from "../models/viewTable";
import Comment from "../models/commentTable";
import Like from "../models/likeTable";
import Follow from "../models/followTable";

let createOrUpdatePen = async (req, res) => {
    try {
        if (req.body.pen_id != null) {
          // console.log('update \n');
          // console.log(req.body);
            const existingPen = await Pen.findOne({ where: { pen_id: req.body.pen_id } });

            // console.log(existingPen)
            // console.log('pen', req.body.pen_id)
            // Nếu pen đã tồn tại, thực hiện cập nhật
            existingPen.html_code = req.body.html_code;
            existingPen.js_code = req.body.js_code;
            existingPen.css_code = req.body.css_code;
            await existingPen.save();
    
            // Trả về thông tin pen đã được cập nhật
            return res.status(200).json({code: 200, pen: existingPen, message: "cập nhật pen thành công"});
        } else {
          // console.log('create \n');
          // console.log('pen', req.body.pen_id)
            // Nếu pen chưa tồn tại, tạo mới pen
            // console.log(req.body);
            const newPen = await Pen.create({
            html_code: req.body.html_code,
            js_code: req.body.js_code,
            css_code: req.body.css_code,
            name: req.body.name,
            });
            await User_Pen.create({
                user_id: req.body.user_id,
                pen_id: newPen.pen_id
            });
            return res.status(201).json({code: 200, pen: newPen, message: "tạo pen mới thành công"});
        // Trả về thông tin pen đã được tạo
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi trong quá trình tạo hoặc cập nhật pen' });
    }
}
  
// Hàm để lấy thông tin pen bằng id
async function getPenById(req, res) {
    const { pen_id } = req.body;
  
    try {
      const pen = await Pen.findOne({ where: { pen_id: pen_id } });
  
      if (!pen) {
        return res.status(404).json({ code: 404, message: 'Không tìm thấy pen với id đã cho' });
      }
      return res.status(200).json({ code: 200, pen, message: 'Lấy thông tin pen thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy thông tin pen' });
    }
}

async function getPenByUser(req, res) {
  const user_id  = req.params.id;
  try {
    const pen = await User_Pen.findAll({ where: { user_id: user_id } });
    const penIdValues = pen.map((pen) => pen.pen_id);
    return res.status(200).json(penIdValues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy thông tin pen' });
  }
}

async function getInfoPen(req, res) {
  const penId = req.params.id;

  try {
    // console.log(penId);
    const pen = await Pen.findByPk(penId);

    // console.log(pen)
    if (!pen) {
      return res.status(404).json({ error: 'Pen not found' });
    }

    const userPen = await User_Pen.findOne({
      where: { pen_id: penId },
      include: [{ model: User }],
    });

    const viewCount = await View.count({ where: { pen_id: penId } });

    const commentCount = await Comment.count({ where: { pen_id: penId } });

    const likeCount = await Like.count({ where: { pen_id: penId } });
    const result = {
      pen: pen,
      user: userPen ? userPen.user : null,
      view: viewCount,
      comment: commentCount,
      like: likeCount
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getTrending(req, res) {
  try {
    const penIds = await Like.findAll({
      attributes: [
        'pen_id',
        [Sequelize.fn('COUNT', Sequelize.col('user_id')), 'numlikes'],
      ],
      group: ['pen_id'],
    });

    penIds.sort(function(a,b) {
      return a.numlikes - b.numlike;
    })

    const penIdValues = penIds.map((pen) => pen.pen_id);
    res.json(penIdValues);
  } catch (error) {
    console.error('Error fetching pen ids:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getFollow(req, res) {
  const user_id_1 = req.params.id;
  // console.log('abcxyy', user_id_1);

  try {
    let penIds = await Follow.findAll({
      where: {
        user_id_1: user_id_1,
      },
    });

    penIds = penIds.map((x) => x.user_id_2);

    let userPenRecords = await User_Pen.findAll({
      where: {
        user_id: penIds,
      },
      attributes: ['pen_id'],
    });

    penIds = userPenRecords.map((x) => x.pen_id);

    res.json(penIds);
  } catch (error) {
    console.error('Error fetching pen ids:', error);
    throw error;
  }
}

module.exports = {
    createOrUpdatePen, getPenById, getInfoPen, getTrending, getFollow, getPenByUser
};
