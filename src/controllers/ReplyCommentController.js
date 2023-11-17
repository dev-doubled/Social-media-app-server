import ReplyCommentService from "../services/ReplyCommentService.js"

class ReplyCommentController {
  // [GET] /api/v1/replyComment
  async getAll(req, res, next) {
    try {
      const replyComments = await ReplyCommentService.getAllReplyComments();
      res.status(200).json(replyComments);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [GET] /api/v1/replyComment/id
  async getById(req, res, next) {
    const replyCommentId = req.params.id;
    try {
      const replyComment = await ReplyCommentService.getReplyCommentById(replyCommentId);
      if (!replyComment) {
        res.status(404).json({ message: "Reply comment not found" });
      } else {
        res.status(200).json(replyComment);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      next(error);
    }
  }

  // [POST] /api/v1/replyComment/create
  async create(req, res, next) {
    try {
      const replyComments = await ReplyCommentService.createReplyComment(req.body);
      res.status(200).json(replyComments);
    } catch (error) {
      console.error("Error creating reply comment:", error);
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new ReplyCommentController();