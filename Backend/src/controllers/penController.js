const Sequelize = require('sequelize');

import User from "../models/user";
import Pen from "../models/pen";
import View from "../models/viewTable";
import Comment from "../models/commentTable";
import Like from "../models/likeTable";
import Follow from "../models/followTable";
import Pin from "../models/pin";
import CollectionPen from "../models/collection_pen";

import followController, { _getFollowByUserID } from './followControler';
import { _getViewByPen } from './viewController';
import { _getLikeByuserID } from "./likeController";
import { _formatDateString } from "./userController";

async function savePen(req, res) {
  const data = req.body.data;
  const user = req.body.user;
  console.log(data)
  try {
    if (data.pen.pen_id != null && data.user.user_id == user.user_id) {
      const existingPen = await Pen.findOne({ where: { pen_id: data.pen.pen_id } });

      existingPen.html_code = data.pen.html_code;
      existingPen.js_code = data.pen.js_code;
      existingPen.css_code = data.pen.css_code;
      existingPen.name = data.pen.name;
      existingPen.type_css = data.pen.type_css;
      existingPen.status = data.pen.status;

      await existingPen.save();

      return res.status(200).json({ code: 200, pen: existingPen, message: "cập nhật pen thành công" });
    }
    else if (data.pen.pen_id == null) {
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
      return res.status(201).json({ code: 201, pen: newPen, message: "tạo pen mới thành công" });
    }

    else {
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
      return res.status(201).json({ code: 202, pen: newPen, message: "clone pen thành công" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi trong quá trình tạo hoặc cập nhật pen' });
  }
}
async function createFromForkPen(req, res) {
  const {
    html_code,
    js_code,
    css_code,
    user_id,
    name,
    type_css,
  } = req.body;

  if (user_id == '') res.status(404).json('loi');

  console.log('abc', name)

  try {

    const newPen = await Pen.create({
      html_code: html_code,
      js_code: js_code,
      css_code: css_code,
      name: name + ' - copy' || 'Untitled',
      type_css: type_css || 'css',
      status: "public",
      deleted: false,
      user_id: user_id,
    });

    res.status(201).json(newPen);
  } catch (error) {
    res.status(500).json('loi');
  }
}


async function createOrUpdatePen(req, res) {
  try {
    if (req.body.pen_id != null) {
      const existingPen = await Pen.findOne({ where: { pen_id: req.body.pen_id } });
      if (!existingPen) {
        return res.status(404).json({ code: 404, message: 'Pen not found' });
      }

      if (req.body.delete) {
        if (existingPen.deleted) {
          return res.status(200).json({ code: 200, message: 'Pen is already deleted' });
        }

        existingPen.deleted = true;
        await existingPen.save();

        // Xóa pen khỏi tất cả các collection chứa nó
        await CollectionPen.destroy({ where: { pen_id: existingPen.pen_id } });

        return res.status(200).json({ code: 200, message: 'Pen deleted successfully' });
      } else if (req.body.restore) {
        if (!existingPen.deleted) {
          return res.status(200).json({ code: 200, message: 'Pen is not deleted' });
        }

        existingPen.deleted = false;
        await existingPen.save();

        return res.status(200).json({ code: 200, pen: existingPen, message: 'Pen restored successfully' });
      }

      existingPen.html_code = req.body.html_code;
      existingPen.js_code = req.body.js_code;
      existingPen.css_code = req.body.css_code;
      existingPen.name = req.body.name;
      existingPen.deleted = false; // Đặt trạng thái deleted về false
      await existingPen.save();

      return res.status(200).json({ code: 200, pen: existingPen, message: "Cập nhật pen thành công" });
    } else {
      const newPen = await Pen.create({
        html_code: req.body.html_code,
        js_code: req.body.js_code,
        css_code: req.body.css_code,
        name: req.body.name,
        user_id: req.body.user_id,
        deleted: false, // Mặc định là false khi tạo mới
      });
      return res.status(201).json({ code: 200, pen: newPen, message: "Created a new pen successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating or updating pen' });
  }
}

async function getPenById(req, res) {
  const { pen_id } = req.body;

  try {
    const pen = await Pen.findOne({ where: { pen_id: pen_id, deleted: false } });

    if (!pen) {
      return res.status(404).json({ code: 404, message: 'No pen found with the given id' });
    }

    return res.status(200).json({ code: 200, pen, message: 'Retrieve pen information successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, error: 'Error while retrieving pen information' });
  }
}


async function _getPenByUserID(user_id) {
  try {
    const pen = await Pen.findAll({
      where: { user_id: user_id, deleted: false },
      attributes: ['pen_id']
    });
    const penIdValues = pen.map((pen) => pen.pen_id);
    return penIdValues;
  } catch (error) {
    console.error(error);
    throw e;
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
  const user_id = req.params.id;
  try {
    const pen = await _getPenByUser(user_id)
    return res.status(200).json(pen);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, error: 'Error while retrieving pen information' });
  }
}

// async function _getPenByUserFullOption(user_id) {
//   try {
//     const pen = await Pen.findAll({
//       where: { user_id: user_id, deleted: false },
//       attributes: ['pen_id', 'createdAt', 'updatedAt', 'css_code', 'type_css'],
//       raw: true,
//     });
//     return pen;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }


// async function getPenByUserFullOption(req, res) {
//   const user_id = req.params.id;
//   try {
//     const pen = await _getPenByUserFullOption(user_id)
//     return res.status(200).json(pen);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ code: 500, error: 'Lỗi trong quá trình lấy thông tin pen' });
//   }
// }

async function _getPenStatusByUserID(user_id, status) {
  try {
    const pen = await Pen.findAll({
      where: { status: status, user_id: user_id, deleted: false },
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
  const { user_id, sortby } = req.query;

  try {
    let pens;
    if (sortby == "numlike" || sortby == "numview") {
      pens = await Pen.findAll({
        attributes: {
          include: [
            [Sequelize.literal('(SELECT count(like_id) FROM like_table WHERE pen.pen_id = like_table.pen_id AND like_table.type = "pen")'), 'numlike'],
            [Sequelize.literal('(SELECT count(view_id) FROM view_table WHERE pen.pen_id = view_table.pen_id AND view_table.type = "pen")'), 'numview'],
          ]
        },
        where: { user_id: user_id },
        order: [[sortby, 'DESC']],
      })
    } else if (sortby == "private" || sortby == "public") {
      pens = await Pen.findAll({
        where: { user_id: user_id, status: sortby },
      })
    }

    pens = pens.map(x => x.pen_id);

    res.status(200).json(pens)
  } catch (error) {
    console.log("simp gai 808:", error);
    console.error(error);
  }
}


async function getInfoPen(req, res) {
  const penId = req.query.pen_id;
  const user_id = req.query.user_id;
  try {
    const pen = await Pen.findByPk(penId, { where: { deleted: false } });

    if (!pen) {
      return res.status(404).json({ error: 'Pen not found' });
    }
    let userPen = null
    if (pen.user_id !== null) {
      userPen = await User.findOne({
        where: { user_id: pen.user_id }
      });
    }
    let likeRecord;
    if (user_id !== null) {
      likeRecord = await Like.findOne({
        where: {
          user_id: user_id,
          pen_id: penId,
        },
      });
    } else {
      likeRecord == null;
    }

    const viewCount = await View.count({ where: { pen_id: penId, type: "pen" } });

    const commentCount = await Comment.count({ where: { pen_id: penId, type: "pen" } });

    const likeCount = await Like.count({ where: { pen_id: penId, type: "pen" } });
    const result = {
      pen: pen,
      user: userPen,
      view: viewCount,
      comment: commentCount,
      like: likeCount,
      liked: likeRecord != null,
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
        [Sequelize.fn('COUNT', Sequelize.col('like_table.user_id')), 'numlikes'],
      ],
      include: [{
        model: Pen,
        where: { deleted: false }
      }],
      group: ['pen_id'],
      limit: 30,
    });

    const penIds1 = await View.findAll({
      attributes: [
        'pen_id',
        [Sequelize.fn('COUNT', Sequelize.col('view_table.user_id')), 'numview'],
      ],
      include: [{
        model: Pen,
        where: { deleted: false }
      }],
      group: ['pen_id'],
    });

    penIds.sort(function (a, b) {
      return a.pen_id - b.pen_id;
    })

    penIds1.sort(function (a, b) {
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

    mergeArr.sort(function (a, b) {
      return b.count - a.count;
    })

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
      where: { user_id: user_id, deleted: false },
      attributes: ['pen_id', 'html_code', 'js_code', 'css_code', 'type_css'],
      raw: true,
    });

    pens = shuffleArray(pens);
    if (pens.length > 0) {
      pens = pens.slice(0, Math.min(2, pens.length));
      res.status(200).json(pens);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.log('get pen for follow error:', e);
  }
}

async function getFollow(req, res) {
  const user_id = req.query.user_id;
  const x = req.query.x;

  console.log(user_id)

  let attr_sort = "createdAt";
  let sort_by = 'desc';

  if (x != '') {
    attr_sort = 'numpen';
    sort_by = 'asc';
  }

  try {
    let followUsers = await followController._getFollowByUserID(user_id, attr_sort = attr_sort, sort_by = sort_by);

    // followUsers = followUsers.map(x => x.user_id_2);

    followUsers = [...new Set(followUsers)];

    if (followUsers.length > 0) {
      let pens = [];

      for (let followUser of followUsers) {
        const userPens = await _getPenByUser(followUser);
        if (userPens.length > 0) {
          pens.push(...userPens);
        }
      }

      res.status(200).json(pens.flat());
    } else {
      res.status(200).json([]);
    }

  } catch (e) {
    console.log('get follow pen for follow error:', e);
  }
}

async function getPenByUserIdFullOption(req, res) {
  const user_id = req.params.id;
  try {
    const pen = await Pen.findAll({
      where: { user_id: user_id, deleted: false },
      attributes: ['pen_id', 'status', 'updatedAt', 'createdAt', 'name'],
      raw: true,
    });
    res.status(200).json(pen);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, error: 'Error while retrieving pen information' });
  }
}

async function getAllPen(req, res) {
  const attr_sort = req.query.attr_sort
  const order_by = req.query.order_by;
  const deleted = req.query.deleted == '' ? false : (req.query.deleted == "true" ? true : false);

  try {
    let pens = await Pen.findAll({
      attributes: {
        exclude: ['password', 'html_code', 'js_code', 'css_code', 'type_css'],
        include: [
          [Sequelize.literal('(SELECT user_name FROM user WHERE user_id = pen.user_id)'), 'user_name'],
          [Sequelize.literal('(SELECT count(like_id) FROM like_table WHERE like_table.pen_id = pen.pen_id AND like_table.type = "pen")'), 'numlike'],
          [Sequelize.literal('(SELECT count(view_id) FROM view_table WHERE view_table.pen_id = pen.pen_id AND view_table.type = "pen")'), 'numview'],
          [Sequelize.literal('(SELECT count(comment_id) FROM comment_table WHERE comment_table.pen_id = pen.pen_id AND comment_table.type = "pen")'), 'numcomment'],
        ],
      },
      where: { deleted: deleted },
      order: attr_sort != '' ? [[attr_sort, order_by || 'ASC']] : undefined,
    });

    pens = pens.map(pen => ({
      ...pen.toJSON(),
      id: pen.pen_id,
      name: (pen.name == null ? "Untitled" : pen.name),
      createdAtRaw: pen.createdAt,
      updatedAtRaw: pen.updatedAt,
      createdAt: _formatDateString(pen.createdAt),
      updatedAt: _formatDateString(pen.updatedAt),
    }));

    res.status(200).json(pens);
  } catch (error) {
    console.log("chan gai 808", error);
  }
}

async function checkPenStatus(req, res) {
  const penId = req.query.pen_id;

  try {
    const pen = await Pen.findByPk(penId, { where: { deleted: false } });

    if (!pen) {
      return res.status(404).json({ error: 'Pen not found' });
    }

    return res.status(200).json({ status: pen.status, message: 'Lấy trạng thái pen thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function togglePenStatus(req, res) {
  const { pen_id } = req.body;

  try {
    const existingPen = await Pen.findOne({ where: { pen_id: pen_id, deleted: false } });

    if (!existingPen) {
      return res.status(404).json({ code: 404, message: 'Không tìm thấy pen' });
    }

    // Toggle the status between 'public' and 'private'
    existingPen.status = existingPen.status === 'public' ? 'private' : 'public';
    await existingPen.save();

    return res.status(200).json({ code: 200, pen: existingPen, message: 'Change pen status successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, error: 'Error during pen state transition' });
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
  getPenByUserIdFullOption,

  getAllPen,
  checkPenStatus,
  togglePenStatus,

  _getPenByUserID,
  createFromForkPen,
};