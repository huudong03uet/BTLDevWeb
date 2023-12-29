const Sequelize = require('sequelize');
const { Op } = require("sequelize");
import Pin from '../models/pin';
import Pen from '../models/pen';
import Collection from '../models/collection';

const Follow = require('../models/followTable');

let getPinnedUser = async (req, res) => {
    try {
        const userId = req.params.user_id;
    
        // Lấy danh sách các pin của người dùng
        const pins = await Pin.findAll({
          where: { user_id: userId }
        });
    
        res.status(200).json({ success: true, pins });
      } catch (error) {
        console.error('Error fetching pinned user data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }    
}


module.exports = {
    getPinnedUser,
};