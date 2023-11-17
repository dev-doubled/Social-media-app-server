import express from "express";
const router = express.Router();

import replyCommentController from "../controllers/ReplyCommentController.js";

router.get("/:id", replyCommentController.getById);
router.post("/create", replyCommentController.create);
router.get("/", replyCommentController.getAll);


export default router;
