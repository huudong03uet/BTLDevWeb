const Sequelize = require('sequelize');

import User from "../models/user";
import Pen from "../models/pen";
import View from "../models/viewTable";
import Comment from "../models/commentTable";
import Like from "../models/likeTable";
import Follow from "../models/followTable";
import Pin from "../models/pin";

import followController, { getFollowByUserID } from './followControler';
import { _getViewByPen } from './viewController';
import { _getLikeByuserID } from "./likeController";


async function savePen(req, res) {
  const data = req.body.data;
  const user = req.body.user;
  console.log(data)
  try {
    if (data.pen.pen_id != null && data.user.user_id == user.user_id) {
        const existingPen = await Pen.findOne({ where: { pen_id: data.pen.pen_id } });

        // console.log(existingPen)
        // console.log('pen', data.pen.pen_id)
        // Nếu pen đã tồn tại, thực hiện cập nhật
        existingPen.html_code = data.pen.html_code;
        existingPen.js_code = data.pen.js_code;
        existingPen.css_code = data.pen.css_code;
        existingPen.name = data.pen.name;
        existingPen.type_css = data.pen.type_css;
        existingPen.status = data.pen.status;

        await existingPen.save();

        // Trả về thông tin pen đã được cập nhật
        return res.status(200).json({code: 200, pen: existingPen, message: "cập nhật pen thành công"});
    } else {
        // Nếu pen chưa tồn tại, tạo mới pen
        const newPen = await Pen.create({
          html_code: data.pen.html_code,
          js_code: data.pen.js_code,
          css_code: data.pen.css_code,
          name: data.pen.name,
          type_css: data.pen.type_css,
          status: data.pen.status,
          deleted: data.pen.deleted,
          user_id: user.user_id,
        });
        return res.status(201).json({code: 200, pen: newPen, message: "tạo pen mới thành công"});
      // Trả về thông tin pen đã được tạo
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi trong quá trình tạo hoặc cập nhật pen' });
  }
}


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
            existingPen.name = req.body.name;
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
            user_id: req.body.user_id,
            name: req.body.name
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


async function _getPenByUserID(user_id) {
  try {
    const pen = await Pen.findAll({ 
      where: { user_id: user_id },
      attributes: ['pen_id']
    });
    const penIds = pen.map(pen => pen.pen_id);
    return penIds;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function _getPenByUser(user_id) {
  try {
    const pen = await _getPenByUserID(user_id);
    return pen;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPenByUser(req, res) {
  const user_id  = req.params.id;
  try {
    const pen = await _getPenByUser(user_id)
    return res.status(200).json(pen);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy thông tin pen' });
  }
}

async function _getPenStatusByUserID(user_id, status) {
  try {
    const pen = await Pen.findAll({ 
      where: { status: status, user_id: user_id },
      attributes: ['pen_id']
    });
    const penIds = pen.map(pen => pen.pen_id);
    return penIds;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPenByUserSort(req, res) {
  const {user_id, sortby}  = req.query;

  console.log(req.query)

  try {
    if (sortby == 'private' || sortby == 'public') {
      let pen = await _getPenStatusByUserID(user_id, sortby);
      return res.status(200).json(pen);
    }  else if (sortby == 'view') {
      let pen = await _getPenByUser(user_id);

      let arrSort = []; 

      await Promise.all(pen.map(async (i) => {
        let x =  (await _getViewByPen(i)).length
        arrSort.push(x);
      }));

      const penWithSortValues = pen.map((item, index) => ({
        pen: item,
        arrSortValue: arrSort[index],
      }));

      penWithSortValues.sort((a, b) => b.arrSortValue - a.arrSortValue);

      pen = penWithSortValues.map((item) => item.pen);
      arrSort = penWithSortValues.map((item) => item.arrSortValue);

      return res.status(200).json(pen);

    } else if (sortby == 'like') {
      let pen = await _getLikeByuserID(user_id);
      const penIds = pen.map(pen => pen.pen_id);
      return res.status(200).json(penIds);
    }

    
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function getInfoPen(req, res) {
  const penId = req.query.pen_id;
  const user_id = req.query.user_id;
  // console.log(penId, user_id);
  // console.log(123333);
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
    let likeRecord;
    if(user_id !== null) {
      likeRecord = await Like.findOne({
        where: {
            user_id: user_id,
            pen_id: penId,
        },
      });
    }
    else {
      likeRecord == null;
    }
  
    const viewCount = await View.count({ where: { pen_id: penId, type: "pen" } });

    const commentCount = await Comment.count({ where: { pen_id: penId, type: "pen" } });

    const likeCount = await Like.count({ where: { pen_id: penId, type: "pen"} });
    const result = {
      pen: pen,
      user: userPen,
      view: viewCount,
      comment: commentCount,
      like: likeCount,
      liked: likeRecord!=null,
    };

    res.status(200).json(result);
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

    const penIds1 = await View.findAll({
      attributes: [
        'pen_id',
        [Sequelize.fn('COUNT', Sequelize.col('user_id')), 'numview'],
      ],
      group: ['pen_id'],
    });

    penIds.sort(function(a,b) {
      return a.pen_id - b.pen_id;
    })

    penIds1.sort(function(a,b) {
      return a.pen_id - b.pen_id;
    })

    let mergeArr = [];

    let i = 0;
    let j = 0;
    while (i < penIds.length && j < penIds1.length) {
      if (penIds[i].pen_id < penIds1[j].pen_id) {
        mergeArr.push({ pen_id: penIds[i].dataValues.pen_id, count: penIds[i].dataValues.numlikes });
        i += 1;
      } else if (penIds[i].pen_id > penIds1[j].pen_id) {
        mergeArr.push({ pen_id: penIds1[j].dataValues.pen_id, count: penIds1[j].dataValues.numview });
        j += 1;
      } else if (penIds[i].dataValues.pen_id === penIds1[j].dataValues.pen_id) {
        mergeArr.push({
          pen_id: penIds[i].dataValues.pen_id,
          count: penIds[i].dataValues.numlikes + penIds1[j].dataValues.numview,
        });
        i += 1;
        j += 1;
      }
    }

    while (i < penIds.length) {
      mergeArr.push({ pen_id: penIds[i].pen_id, count: penIds[i].numlikes });
      i += 1;
    }

    while (j < penIds1.length) {
      mergeArr.push({ pen_id: penIds1[j].pen_id, count: penIds1[j].numview });
      j += 1;
    }

    mergeArr.sort(function(a,b) {
      return b.count - a.count;
    })

    console.log(mergeArr);

    const penIdValues = mergeArr.map((pen) => pen.pen_id);
    res.status(200).json(penIdValues);
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

    pens = shuffleArray(pens);
    if (pens.length > 0) {
      pens = pens.slice(0, 2);
      res.status(200).json(pens);
    } else if(pens.length == 1) {
      pens.push(pens[0]);
      res.status(200).json(pens); 
    } else {
      res.status(200).json(null)
    }
    


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

      res.status(200).json(pens.flat());
    } else {
      res.status(200).json([]);
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
    savePen,
    _getPenByUser,
    getPenByUserSort,
};