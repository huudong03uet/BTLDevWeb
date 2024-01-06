import express from "express";
import penController from "../controllers/penController"
import deletedController from "../controllers/deletedController"
const router = express.Router();


router.get("/checkStatus", penController.checkPenStatus);
router.get("/getInfoPen", penController.getInfoPen);
router.get("/getTrending", penController.getTrending);
router.get("/getPenByUser/:id", penController.getPenByUser);
router.get("/getPenByUserIDForFollow/:id", penController.getPenByUserIDForFollow);
router.get("/getFollow/", penController.getFollow);
router.get("/getPenByUserSort/", penController.getPenByUserSort);
router.get("/getPenByUserIdFullOption/:id", penController.getPenByUserIdFullOption);
router.get("/getAllPen", penController.getAllPen);

router.post('/getPenById', penController.getPenById);
router.post('/createFromForkPen', penController.createFromForkPen);
router.post("/createOrUpdatePen", penController.createOrUpdatePen);
router.post("/savePen", penController.savePen);
router.post('/deletePenPermanently', deletedController.deletePenPermanently);
router.post("/toggleStatus", penController.togglePenStatus);

module.exports = router;
