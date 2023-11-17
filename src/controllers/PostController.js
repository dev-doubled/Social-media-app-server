import PostService from "../services/PostService.js";

class PostController {
  // [GET] /api/v1/post
  async getAll(req, res, next) {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [POST] /api/v1/post/create
  async create(req, res, next) {
    try {
      const newPost = await PostService.createPost(req.body);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new PostController();
