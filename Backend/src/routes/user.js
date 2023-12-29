//dùng để gọi các thông tin user để tạo mấy trang như treding, ...
import express from "express";
import userController from "../controllers/userController"

const router = express.Router();

router.get("/getInfoUser", userController.getInfoUser);
router.get('/getNotFollow/:id', userController.getNotFollow)

module.exports = router;
