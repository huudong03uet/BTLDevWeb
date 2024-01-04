import express from "express";
import projectController from "../controllers/projectController";
const router = express.Router();

router.post("/createProject", projectController.createProject);
router.get("/getFolderChild", projectController.getFolderChild);
router.get("/getFileChild", projectController.getFileChild);
router.get("/getInfoProject", projectController.getInfoProject);


module.exports = router;