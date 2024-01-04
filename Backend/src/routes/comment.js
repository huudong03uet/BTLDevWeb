//dùng để kiểm tra login các thứ

import express from "express";
import commentController from "../controllers/commentController"

const router = express.Router();

router.get("/getAll", commentController.getAllComment);
router.get("/get", commentController.getAllCommentByID);

router.post("/create", commentController.createComment);

router.put("/update", commentController.editComment);

router.delete("/delete", commentController.deleteComment);


module.exports = router;