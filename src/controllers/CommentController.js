import CommentService from "../services/CommentService.js";

class CommentController {
  // [GET] /api/v1/comment
  async getAll(req, res, next) {
    try {
      const comments = await CommentService.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [POST] /api/v1/comment/create
  async create(req, res, next) {
    try {
      const comments = await CommentService.createComment(req.body);
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new CommentController();
