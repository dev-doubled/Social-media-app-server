import { Photo } from "../models/Photos.js";

class PhotoService {
  async AddPhotoToPhotoArray(user, image, type) {
    //Put the avatar image into the Photos collection
    let photo = await Photo.findOne({ userId: user._id });
    if (!photo) {
      photo = new Photo({ userId: user._id });
    }
    // Check if the image is already in the photos array
    const avatarExists = photo.photos.some((p) => p.imageUrl === image);
    // If not, add the image to the photos array
    if (!avatarExists) {
      photo.photos.push({ imageUrl: image, type: `${type} image` });
      await photo.save();
    }
    // Update user's photos reference
    if (!user.photos) {
      user.photos = photo._id;
      await user.save();
    }
  }

  async getAllPhoto(userId) {
    try {
      const photoRecord = await Photo.findOne({ userId: userId });

      if (photoRecord && photoRecord.photos) {
        const sortedPhotos = photoRecord.photos.sort((a, b) => b.createdAt - a.createdAt);
        const imageUrls = sortedPhotos.map((photo) => photo.imageUrl);
        return imageUrls;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new PhotoService();
