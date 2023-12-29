//dùng để gọi các thông tin user để tạo mấy trang như treding, ...
import express from "express";
import userController from "../controllers/userController"

const router = express.Router();

router.get("/getInfoUser", userController.getInfoUser);

module.exports = router;
