import express from "express";
import pinController from "../controllers/pinController";

const router = express.Router();

router.get("/getPinnedUser/:user_id", pinController.getPinnedUser);


module.exports = router;