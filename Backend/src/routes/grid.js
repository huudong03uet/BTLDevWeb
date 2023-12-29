import express from "express";
import gridController from "../controllers/gridController";
const router = express.Router();

router.post("/updateView", gridController.updateView);
router.get("/handleLike", gridController.handleLike);
router.get("/handlePin", gridController.handlePin);
router.get("/handleFollow", gridController.handleFollow);
router.get("/getInfoGrid", gridController.getInfoGrid);

module.exports = router;
