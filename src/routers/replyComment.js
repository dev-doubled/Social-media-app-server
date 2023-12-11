import express from "express";
const router = express.Router();

import replyCommentController from "../controllers/ReplyCommentController.js";

router.get("/", replyCommentController.getAll);
router.get("/get-all-reply/:commentId", replyCommentController.getAllReplyByCommentId);
router.post("/create", replyCommentController.create);


export default router;
