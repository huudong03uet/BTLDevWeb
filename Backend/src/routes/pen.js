import express from "express";
import penController from "../controllers/penController"
import colection  from "../controllers/colectionController";
const router = express.Router();

router.post("/getPenById", penController.getPenById);
router.post("/createOrUpdatePen", penController.createOrUpdatePen);
//router.get("/getInfoPen/:id", penController.getInfoPen);
module.exports = router;
