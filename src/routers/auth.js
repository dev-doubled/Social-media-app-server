import express from "express";
const router = express.Router();

import authController from "../controllers/AuthController.js";

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/confirm/token/:email/:token", authController.verifyEmail);
router.get("/confirm/token/v2/:email/:token", authController.verifyEmailV2);
router.get("/confirm/code/:email/:code", authController.verifyCode);
router.get("/confirm/recovery/:email/:code", authController.verifyRecoveryCode);
router.get("/confirm/get-confirm-token/:username", authController.getConfirmToken);
router.get("/re-send/:email", authController.reSend)
router.post("/token", authController.refreshAccessToken);


export default router;
