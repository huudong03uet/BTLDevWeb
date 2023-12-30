//dùng để kiểm tra login các thứ

import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/login", authController.login);
// router.post("/loginAdmin", authController.loginAdmin);
router.post("/signup", authController.signup);
// router.post("/change-profile", authController.changeProfile);
// router.post("/saveHistory", authController.saveHistory);
// router.post("/history", authController.getHistory);
router.post('/updatePassword/:id', authController.updatePassword);


module.exports = router;