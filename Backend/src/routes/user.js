const express = require('express');
const userController = require('../controllers/userController');
import deletedController from "../controllers/deletedController"

const router = express.Router();

router.get('/getInfoUser', userController.getInfoUser);

// router.get('/getNotFollow/:id', userController.getNotFollow);
router.get('/getAlluser', userController.getAlluser);

router.put('/updateProfile/:id', userController.updateProfile);

router.post('/changeUsername/:id', userController.changeUsername);
router.post('/changeEmail/:id', userController.changeEmail);
router.put('/removeOrRestoreUser', userController.removeOrRestoreUser);

router.delete('/deleteUser/:id', deletedController.deleteUserPermanently);
module.exports = router;
