import express from "express";
const router = express.Router();

import postController from "../controllers/PostController.js";

router.post("/create", postController.create);
router.get("/", postController.getAll);


export default router;
