import UserService from "../services/UserService.js";

class PostController {
  // [GET] /api/v1/user
  async getAll(req, res, next) {}

  // [GET] /api/v1/user/get-user/:username
  async getUser(req, res, next) {
    try {
      const { username } = req.params;
      const user = await UserService.getUser(username);
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [GET] /api/v1/user/info/:userId
  async getInfo(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await UserService.getInfo(userId);
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [GET] /api/v1/user
  async getUserCoverImage(req, res, next) {
    try {
      const { userId } = req.params;
      const coverImage = await UserService.getUserCoverImage(userId);
      res.status(200).json({ coverImage });
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [POST] /api/v1/user/new-password
  async changePassword(req, res, next) {
    try {
      const userData = req.body;
      await UserService.changePassword(userData);
      res.status(200).json("Success");
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [POST] /api/v1/user/update-cover-image
  async updateCoverImage(req, res, next) {
    try {
      const { userId, coverImage } = req.body;
      const user = await UserService.updateCoverImage(userId, coverImage);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [POST] /api/v1/user/update-user-avatar
  async updateUserAvatar(req, res, next) {
    try {
      const { userId, userAvatar } = req.body;
      const user = await UserService.updateUserAvatar(userId, userAvatar);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new PostController();
