const Sequelize = require('sequelize');
const { Op } = require("sequelize");
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


  module.exports = {
    getInfoUser,

};