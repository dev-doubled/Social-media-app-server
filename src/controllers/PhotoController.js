import PhotoService from "../services/PhotoService.js";

class PhotoController {
  // [GET] /api/v1/photo/get-all-photo/:userId
  async getAllPhoto(req, res, next) {
    try {
      const { userId } = req.params;
      const photos = await PhotoService.getAllPhoto(userId);
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new PhotoController();
