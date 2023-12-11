import express from "express";
const router = express.Router();
// import { authenticateToken } from "../middleware/AuthMiddleware.js";
import photoController from "../controllers/PhotoController.js";

router.get("/get-all-photo/:userId", photoController.getAllPhoto);

export default router;
