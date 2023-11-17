import express from "express";
const router = express.Router();

import authController from "../controllers/AuthController.js";

router.post("/login", authController.login);
router.post("/signup", authController.signup);


export default router;
