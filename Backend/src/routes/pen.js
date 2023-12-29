import express from "express";
import penController from "../controllers/penController"
const router = express.Router();

router.post("/getPenById", penController.getPenById);
router.post("/createOrUpdatePen", penController.createOrUpdatePen);
router.get("/getInfoPen/", penController.getInfoPen);
router.get("/getTrending", penController.getTrending);
router.get("/getFollow/:id", penController.getFollow);
router.get("/getPenByUser/:id", penController.getPenByUser);

module.exports = router;
