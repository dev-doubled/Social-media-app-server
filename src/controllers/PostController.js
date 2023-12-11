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

  // [GET] /api/v1/post/get-all-by-user/:userId
  async getAllByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const posts = await PostService.getAllByUser(userId);
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

  //[POST] /api/v1/post/add-reaction/:postId
  async addReaction(req, res, next) {
    try {
      const { postId } = req.params;
      const { userId, reaction } = req.body;
      const post = await PostService.addReaction(postId, userId, reaction);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  //[GET] /api/v1/post/get-reaction/:postId/:userId
  async getReactionByUserIdAndPostId(req, res, next) {
    try {
      const { postId, userId } = req.params;
      const reaction = await PostService.getReactionByUserIdAndPostId(
        userId,
        postId
      );
      res.status(200).json(reaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  //[GET] /api/v1/post/get-all-reaction/:postId
  async getAllReaction(req, res, next) {
    try {
      const { postId } = req.params;
      const reactions = await PostService.getAllReaction(postId);
      res.status(200).json(reactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new PostController();
