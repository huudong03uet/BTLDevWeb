import express from "express";
import gridController from "../controllers/gridController";
const router = express.Router();

router.post("/updateView", gridController.updateView);
router.get("/handleLike", gridController.handleLike);
router.get("/handlePin", gridController.handlePin);
router.get("/handleFollow", gridController.handleFollow);
router.get("/getInfoGrid", gridController.getInfoGrid);
router.get("/isUser1FollowingUser2", gridController.checkFollowStatus); 
router.get("/checkLikeStatus", gridController.checkLikeStatus);

module.exports = router;
