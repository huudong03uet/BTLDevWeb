const Sequelize = require('sequelize');
// const { Op } = require("sequelize");

import followController from './followControler';
import User from '../models/user';
import penController from './penController';
import Follow from '../models/followTable';

// Add the missing function
async function getFollowByUserID(user_id) {
  try {
    const getUser = await Follow.findAll({
      where: { user_id_1: user_id },
    });

    if (getUser) {
      const userIDs = getUser.map((user) => user.user_id_2);
      return userIDs;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Get follow by id error:', error);
    throw error;
  }
}

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
      location: user.location,  // Add location to the response
      bio: user.bio,            // Add bio to the response
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

async function getAllUserExclude(arrUserID, user_id) {
  try {
    let users = await User.findAll({
      where: {
        user_id: {
          [Sequelize.Op.notIn]: arrUserID
        },
        [Sequelize.Op.not]: { user_id: user_id }, 
      },
      attributes: ['user_id', 'user_name', 'avatar_path']
    });

    users = countPenOfUser(users);

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

    const getFollowUsers = await followController.getFollowByUserID(getOneUser);

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

const Collection = require('../models/collection');
const Pen = require('../models/pen'); 
const ViewTable = require('../models/viewTable'); 
const FollowTable = require('../models/followTable');
const Pin = require('../models/pin');
const LikeTable = require('../models/likeTable');
const CommentTable = require('../models/commentTable');

async function deleteUser(req, res) {
  try {
    const user_id = req.params.id;
    await FollowTable.destroy({
      where: {
        [Sequelize.Op.or]: [
          { user_id_1: user_id },
          { user_id_2: user_id },
        ],
      },
    });
    await CommentTable.destroy({
      where: { pen_id: user_id },
    });
    await LikeTable.destroy({
      where: { pen_id: user_id },
    });
    await Pin.destroy({
      where: { pen_id: user_id },
    });
    
    await ViewTable.destroy({
      where: { pen_id: user_id },
    });
    await Collection.destroy({
      where: { user_id },
    });
    await Pen.destroy({
      where: { user_id },
    });

    const rowCount = await User.destroy({
      where: { user_id },
    });

    if (rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
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
};