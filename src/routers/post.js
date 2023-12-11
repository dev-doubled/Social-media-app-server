import express from "express";
const router = express.Router();
// import { authenticateToken } from "../middleware/AuthMiddleware.js";
import postController from "../controllers/PostController.js";

router.get("/", postController.getAll);
router.get("/get-all-by-user/:userId", postController.getAllByUser);
router.post("/create", postController.create);
router.post("/add-reaction/:postId", postController.addReaction);
router.get("/get-reaction/:postId/:userId", postController.getReactionByUserIdAndPostId);
router.get("/get-all-reaction/:postId", postController.getAllReaction);
export default router;
