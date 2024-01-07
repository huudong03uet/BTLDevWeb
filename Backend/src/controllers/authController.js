const express = require('express');
const User = require('../models/user');
const { Op } = require('sequelize');
const router = express.Router();

let login = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    let statusCode = 200;

    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ gmail: gmail }, { password: password }],
          },
          {
            [Op.and]: [{ user_name: gmail }, { password: password }],
          },
        ],
      },
    });

    if (!user) {
      statusCode = 300;
      res.status(200).json({ statusCode });
    } else res.status(200).json({ statusCode, data: user });
  } catch (error) {
    console.error('Login error:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while logging in.' });
  }
};

let signup = async (req, res) => {
  try {
    const { full_name, user_name, gmail, password } = req.body;

    const existingUserByEmail = await User.findOne({
      where: { gmail },
    });

    const existingUserByUsername = await User.findOne({
      where: { user_name },
    });

    if (existingUserByEmail) {
      return res.status(200).json({
        code: 400,
        error: 'Email already exists in the system.',
      });
    }

    if (existingUserByUsername) {
      return res.status(200).json({
        code: 400,
        error: 'Username already exists in the system.',
      });
    }

    const newUser = await User.create({
      user_name,
      full_name,
      gmail,
      password,
      location: 'Unknown',
    });
    newUser.password = undefined;

    res.status(200).json({ code: 200, data: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ code: 500, error: 'An error occurred while signing up.' });
  }
};

let updatePassword = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(user_id);
    if (!user || user.password !== currentPassword) {
      return res
        .status(401)
        .json({ error: 'Current password is incorrect' });
    }

    const [rowCount] = await User.update(
      { password: newPassword },
      { where: { user_id } }
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Update password error:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating password.' });
  }
};

async function _checkUserWithGmail(gmail) {
  try {
    const x = await User.findOne({
      where: { gmail: gmail },
    });

    if (x) {
      await User.update({ password: 'Abc123456@' }, { where: { user_id: x.dataValues.user_id } });
      return true;
    }

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  login,
  signup,
  updatePassword,
  _checkUserWithGmail
};

