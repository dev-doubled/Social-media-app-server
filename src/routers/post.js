import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import postController from "../controllers/PostController.js";

router.post("/create", authenticateToken, postController.create);
router.get("/", authenticateToken, postController.getAll);

export default router;
