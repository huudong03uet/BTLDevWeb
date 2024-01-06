import express from "express";
import projectController from "../controllers/projectController";
import deletedController from "../controllers/deletedController";

const router = express.Router();

router.post("/createProject", projectController.createProject);
router.get("/getFolderChild", projectController.getFolderChild);
router.get("/getProjectByID", projectController.getProjectByID);
router.get("/getFileChild", projectController.getFileChild);
router.get("/getInfoProject", projectController.getInfoProject);
router.get("/getProjectByUserID", projectController.getProjectByUserID);
router.get("/getProjectByUserSort", projectController.getProjectByUserSort);
router.get("/getAllProject", projectController.getAllProject);
router.post('/deleteProjectPermanently', deletedController.deleteProjectPermanently);
router.post('/remove', projectController.removeProject);
router.post('/restore', projectController.restoreProject);
router.post("/toggleStatus", projectController.toggleProjectStatus);
router.post("/checkStatus", projectController.checkProjectStatus);
router.post("/saveProject", projectController.saveProject);
router.post("/createProjectSample", projectController.createProjectSample);
router.post('/getInfoProjectByID', projectController.getUserInfoByProjectID);

module.exports = router;