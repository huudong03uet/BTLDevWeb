const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/getInfoUser', userController.getInfoUser);
router.get('/getNotFollow/:id', userController.getNotFollow);
router.put('/updateProfile/:id', userController.updateProfile);
router.post('/changeUsername/:id', userController.changeUsername);
router.post('/changeEmail/:id', userController.changeEmail);
router.delete('/deleteUser/:id', userController.deleteUser);
module.exports = router;
