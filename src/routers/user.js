import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";

router.get("/", userController.getAll);
router.get("/get-user/:username", userController.getUser)
router.post("/new-password", userController.changePassword)

export default router;
