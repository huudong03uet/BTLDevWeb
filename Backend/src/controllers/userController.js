const Sequelize = require('sequelize');
const { Op } = require("sequelize");
import followController from './followControler';
import User from '../models/user';

let getInfoUser = async (req, res) => {
    try {
      const user_id = req.query.user_id;
  
      // Find the user by user_id excluding the password field
      const user = await User.findByPk(user_id, {
        attributes: { exclude: ['password'] },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
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

async function getAllUserExclude(arrUserID) {
  try {
    let users = await User.findAll({
      where: {
        user_id: {
          [Sequelize.Op.notIn]: arrUserID
        }
      },
      attributes: ['user_id', 'user_name', 'avatar_path']
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

    const getFollowUsers = await followController.getFollowByUserID(getOneUser);

    const getAllNotFollow = await getAllUserExclude(getFollowUsers);

    const uniqueNotFollow = [...new Set(getAllNotFollow)];

    res.json(uniqueNotFollow);
  } catch (error) {
    console.error('Error fetching pen ids:', error);
    throw error;
  }
}

module.exports = {
  getNotFollow, getInfoUser
};