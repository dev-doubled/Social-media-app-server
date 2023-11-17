import { Post } from "../models/Post.js";

class PostService {
  async getAllPosts() {
    try {
      const posts = await Post.find({});
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async createPost(postData) {
    try {
      const newPost = new Post(postData);
      await newPost.save();
      return newPost;
    } catch (error) {
      throw error;
    }
  }
}

export default new PostService();