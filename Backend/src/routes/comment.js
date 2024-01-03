//dùng để kiểm tra login các thứ

import express from "express";
import commentController from "../controllers/commentController"

const router = express.Router();

router.post("/create", commentController.createComment);
router.get("/get", commentController.getAllComment);


module.exports = router;