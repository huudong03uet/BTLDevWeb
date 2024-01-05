const followControler = require('../controllers/followControler');
import express from "express";

const router = express.Router();

router.get("/getFollow", followControler.getFollow);
router.get("/getNotFollow", followControler.getNotFollow);


module.exports = router;