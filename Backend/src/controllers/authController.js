const Sequelize = require('sequelize');
const { Op } = require("sequelize");

import User from "../models/user";
import followController from './followControler';

let login = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ gmail: gmail }, { password: password }]
          },
          {
            [Op.and]: [{ user_name: gmail }, { password: password }]
          }
        ]
      }
    });

    if (!user) {
      res.status(200).json({ code: 300});
    }

    else res.status(200).json({ code: 200, data: user });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình đăng nhập.' });
  }
};

let signup = async (req, res) => {
  try {
    // console.log(req.body)
    const { full_name, user_name, gmail, password } = req.body;

    const existingUserByEmail = await User.findOne({
      where: { gmail },
    });

    const existingUserByUsername = await User.findOne({
      where: { user_name },
    });

    if (existingUserByEmail) {
      return res.status(200).json({ code: 400, error: 'Email đã tồn tại trong hệ thống.' });
    }

    if (existingUserByUsername) {
      return res.status(200).json({ code: 400, error: 'Username đã tồn tại trong hệ thống.' });
    }

    const newUser = await User.create({ user_name, full_name, gmail, password });
    newUser.password = undefined;

    res.status(200).json({ code: 200, data: newUser });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình đăng ký.' });
  }
};

module.exports = {
  login, signup
};
