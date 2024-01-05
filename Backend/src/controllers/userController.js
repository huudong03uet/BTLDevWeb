const Sequelize = require('sequelize');
const { Op } = require("sequelize");
import followController from './followControler';
import User from '../models/user';
import Follow from '../models/followTable';
import penController from './penController';

async function getInfoUser(req, res) {
  try {
    const user_id = req.query.user_id;

    const user = await User.findByPk(user_id, {
      attributes: ['user_id', 'user_name', 'full_name', 'avatar_path', 'location', 'bio'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get followers and following counts
    const followers_count = await Follow.count({ where: { user_id_2: user_id } });
    const following_count = await Follow.count({ where: { user_id_1: user_id } });

    res.status(200).json({
      user_id: user.user_id,
      user_name: user.user_name,
      full_name: user.full_name,
      avatar_path: user.avatar_path,
      location: user.location,
      bio: user.bio,
      followers_count,
      following_count,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserByID(user_id) {
  try {
    const getOneUser = await User.findOne({
      where: { user_id: user_id },
    });

    if (getOneUser) {
      return getOneUser.user_id;
    } else {
      return 1;
    }
  } catch (error) {
    console.error('Get user by id error:', error);
    throw error;
  }
}

async function countPenOfUser(arrUserID) {
  try {
    let updatedArrUserID = await Promise.all(arrUserID.map(async (item) => {
      const pens = await penController._getPenByUser(item.user_id);

      if (!pens || pens.length === 0) {
        return null;
      }

      return item;
    }));

    updatedArrUserID = updatedArrUserID.filter(item => item !== null);

    return updatedArrUserID;
  } catch (error) {
    console.error('Error counting pens for users:', error);
    throw error;
  }
}



async function getAllUserExclude(arrUserID) {
  try {
    let users = await User.findAll({
      attributes: {
        exclude: ['gmail', 'password', 'createdAt', "updatedAt", "full_name", "location", "bio", "deleted", "isAdmin"],
        include: [
          [Sequelize.literal('(SELECT count(pen_id) FROM pen WHERE pen.user_id = user.user_id)'), 'numpen'],
        ]
      },
      where: {
        user_id: {
          [Sequelize.Op.notIn]: arrUserID
        },
      },
      having: { numpen: { [Op.not]: 0 } },
    });

    return users;
  } catch (error) {
    console.error('Get all users excluding some IDs error:', error);
    throw error;
  }
}

async function getNotFollow(req, res) {
  // console.log(1)
  const user_id = req.params.id;
  // console.log('abcxyy', user_id);

  try {
    const getOneUser = await getUserByID(user_id);
    let getFollowUsers = await followController._getFollowByUserID(getOneUser);
    // getFollowUsers = getFollowUsers.map(x => x.user_id_2)
    const getAllNotFollow = await getAllUserExclude(getFollowUsers, user_id);
    const uniqueNotFollow = [...new Set(getAllNotFollow)];

    res.status(200).json(uniqueNotFollow);
  } catch (error) {
    console.error('Error fetching pen ids:', error);
    throw error;
  }
}

async function updateProfile(req, res) {
  try {
    const user_id = req.params.id;
    const { full_name, location, bio } = req.body;

    console.log(req)

    // Perform the update operation
    const [rowCount] = await User.update(
      {
        full_name,
        location,
        bio
      },
      {
        where: { user_id: user_id },
      }
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve the updated user separately
    const updatedUser = await User.findByPk(user_id, {
      attributes: ['user_id', 'full_name', 'location', 'bio', 'links'],
    });

    res.status(200).json({
      user_id: updatedUser.user_id,
      full_name: updatedUser.full_name,
      location: updatedUser.location,
      bio: updatedUser.bio,
      links: JSON.parse(updatedUser.links),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function changeUsername(req, res) {
  try {
    const user_id = req.params.id;
    const newUsername = req.body.newUsername;

    const [rowCount] = await User.update(
      { user_name: newUsername },
      { where: { user_id } }
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await User.findByPk(user_id, {
      attributes: ['user_id', 'user_name'],
    });

    res.status(200).json({
      user_id: updatedUser.user_id,
      user_name: updatedUser.user_name,
    });
  } catch (error) {
    console.error('Error changing username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function changeEmail(req, res) {
  try {
    const user_id = req.params.id;
    const newEmail = req.body.newEmail;

    const [rowCount] = await User.update(
      { gmail: newEmail },
      { where: { user_id } }
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await User.findByPk(user_id, {
      attributes: ['user_id', 'gmail'],
    });

    res.status(200).json({
      user_id: updatedUser.user_id,
      gmail: updatedUser.gmail,
    });
  } catch (error) {
    console.error('Error changing email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const CommentTable = require('../models/commentTable');
const CollectionPen = require('../models/collection_pen');
const FollowTable = require('../models/followTable');
const LikeTable = require('../models/likeTable');
const Pin = require('../models/pin');
const Project = require('../models/project');
const ViewTable = require('../models/viewTable');
const Collection = require('../models/collection');
const Pen = require('../models/pen');


async function deleteUser(req, res) {
  const user_id = req.params.id;

  try {
    // Handle tables with foreign key constraints first
    await Promise.all([
      CommentTable.destroy({ where: { [Sequelize.Op.or]: [{ pen_id: user_id }, { collection_id: user_id }, { user_id: user_id }] } }),
      CollectionPen.destroy({
        where: {
          [Sequelize.Op.or]: [
            { collection_id: user_id },
            { pen_id: user_id },
          ],
        },
      }),
      FollowTable.destroy({
        where: {
          [Sequelize.Op.or]: [
            { user_id_1: user_id },
            { user_id_2: user_id },
          ],
        },
      }),
      LikeTable.destroy({ where: { user_id } }),
    ]);

    // Wait for a short period (e.g., 1000 milliseconds) to allow the database to process deletions
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Delete records in other tables
    await Promise.all([
      Pin.destroy({ where: { user_id } }),
      Project.destroy({ where: { user_id } }),
      ViewTable.destroy({ where: { user_id } }),
      Collection.destroy({ where: { user_id } }),
    ]);

    await new Promise(resolve => setTimeout(resolve, 100));

    // Delete records in the pen table
    await Pen.destroy({ where: { user_id } });

    await new Promise(resolve => setTimeout(resolve, 100));

    // Finally, delete the user
    const userRowCount = await User.destroy({
      where: { user_id },
    });

    if (userRowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const _formatDateString = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  });
  return formattedDate;
};

async function getAlluser(req, res) {
  const attr_sort = req.query.attr_sort
  const order_by = req.query.order_by;
  const deleted = req.query.deleted == '' ? false : (req.query.deleted == "true" ? true : false);

  try {
    let users = await User.findAll({
      attributes: {
        exclude: ['password',]
      },
      where: { deleted: deleted },
      order: attr_sort != '' ? [[attr_sort, order_by || 'ASC']] : undefined,
    });

    users = users.map(user => ({
      ...user.toJSON(),
      createdAt: _formatDateString(user.createdAt),
      updatedAt: _formatDateString(user.updatedAt),
    }));

    res.status(200).json(users);
  } catch (error) {
    console.log("chan gai 808", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getNotFollow,
  getInfoUser,
  updateProfile,
  changeEmail,
  changeUsername,
  deleteUser,
  getAlluser,
  _formatDateString,
  getAllUserExclude
};