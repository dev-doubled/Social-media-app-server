import express from "express";
const router = express.Router();

import commentController from "../controllers/CommentController.js";

router.post("/create", commentController.create);
router.get("/", commentController.getAll);


export default router;
