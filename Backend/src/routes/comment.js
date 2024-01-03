//dùng để kiểm tra login các thứ

import express from "express";
import commentController from "../controllers/commentController"

const router = express.Router();

router.post("/create", commentController.createComment);
router.get("/get", commentController.getAllComment);
router.put("/update", commentController.editComment);
router.delete("/delete", commentController.deleteComment);


module.exports = router;