const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/getInfoUser', userController.getInfoUser);
router.get('/getNotFollow/:id', userController.getNotFollow);
router.post('/updateProfile/:id', userController.updateProfile);

module.exports = router;
