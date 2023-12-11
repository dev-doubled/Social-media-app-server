import express from "express";
const router = express.Router();
// import { authenticateToken } from "../middleware/AuthMiddleware.js";
import userController from "../controllers/UserController.js";

router.get("/", userController.getAll);
router.get("/get-user/:username", userController.getUser);
router.get("/info/:userId", userController.getInfo);
router.get("/get-cover-image/:userId", userController.getUserCoverImage);
router.post("/new-password", userController.changePassword);
router.post("/update-cover-image", userController.updateCoverImage);
router.post("/update-user-avatar", userController.updateUserAvatar);

export default router;
