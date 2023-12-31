import express from "express";
import penController from "../controllers/penController"

const router = express.Router();

router.post('/getPenById', penController.getPenById);
router.post("/createOrUpdatePen", penController.createOrUpdatePen);
router.get("/getInfoPen", penController.getInfoPen);
router.get("/getTrending", penController.getTrending);
router.get("/getPenByUser/:id", penController.getPenByUser);
router.get("/getPenByUserIDForFollow/:id", penController.getPenByUserIDForFollow);
router.get("/getFollow/:id", penController.getFollow);
router.post("/savePen", penController.savePen);

router.get("/getPenByUserSort/", penController.getPenByUserSort);

module.exports = router;
