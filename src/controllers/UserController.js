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
}

export default new PostController();
