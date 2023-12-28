const Sequelize = require('sequelize');

import User from "../models/user";
import Pen from "../models/pen";
import View from "../models/viewTable";
import Comment from "../models/commentTable";
import Like from "../models/likeTable";
import Follow from "../models/followTable";

import followController, { getFollowByUserID } from './followControler';

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
            user_id: req.body.user_id
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

async function _getPenByUser(user_id) {
  try {
    const pen = await Pen.findAll({ 
      where: { user_id: user_id },
      attributes: ['pen_id']
    });
    const penIdValues = pen.map((pen) => pen.pen_id);
    return penIdValues;
  } catch (error) {
    console.error(error);
    throw e;
  }
}

async function getPenByUser(req, res) {
  const user_id  = req.params.id;
  try {
    const pen = await _getPenByUser(user_id)
    return res.status(200).json(penIdValues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy thông tin pen' });
  }
}

async function getInfoPen(req, res) {
  // console.log(314123)
  // console.log(req.query)
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
    
    const likeRecord = await Like.findOne({
      where: {
          user_id: user_id,
          pen_id: penId,
      },
    });
  
    const viewCount = await View.count({ where: { pen_id: penId } });

    const commentCount = await Comment.count({ where: { pen_id: penId } });

    const likeCount = await Like.count({ where: { pen_id: penId } });
    const result = {
      pen: pen,
      user: userPen,
      view: viewCount,
      comment: commentCount,
      like: likeCount,
      liked: likeRecord!=null
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getPenByUserIDForFollow(req, res) {
  const user_id = req.params.id;
  
  try {
    let pens = await Pen.findAll({
      where: { user_id: user_id },
      attributes: ['pen_id', 'html_code', 'js_code', 'css_code', 'type_css'],
      raw: true, 
    });

    // pens = shuffleArray(pens);

    if (pens.length > 0) {
      pens = pens.slice(0, 2);
    } else if(pens.length == 1) {
      pens.push(pens[0]);
    } else {
      res.json(null)
    }
    
    res.json(pens);


  } catch (e) {
    console.log('get pen for follow error:', e);
  }
}

async function getFollow(req, res) {
  const user_id = req.params.id;
  try {
    const followUsers = await followController.getFollowByUserID(user_id);

    if (followUsers.length > 0) {
      const penPromises = followUsers.map(async (followUser) => {
        return await _getPenByUser(followUser);
      });

      let pens = await Promise.all(penPromises);

      pens = pens.filter(pen => pen.length);

      res.json(pens.flat());
    } else {
      res.json([]);
    }

  } catch (e) {
    console.log('get follow pen for follow error:', e);
  }
}

module.exports = {
    createOrUpdatePen, 
    getPenById, 
    getInfoPen, 
    getTrending, 
    getPenByUser, 
    getPenByUserIDForFollow,
    getFollow,
};