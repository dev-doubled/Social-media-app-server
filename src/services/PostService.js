import { Post } from "../models/Post/Post.js";
import { Reactions } from "../models/Post/Reactions.js";
import UserService from "./UserService.js";
import PhotoService from "./PhotoService.js";
class PostService {
  async getAllPosts() {
    try {
      const posts = await Post.find({});
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getAllByUser(userId) {
    try {
      const posts = await Post.find({ "author.userId": userId })
        .sort({ createdAt: -1 })
        .exec();

      return posts;
    } catch (error) {
      throw error;
    }
  }

  async createPost(postData) {
    try {
      const user = await UserService.checkUserExist(postData.author.userId);
      const newPost = new Post(postData);
      if (postData.image) {
        await PhotoService.AddPhotoToPhotoArray(user, postData.image, "Post");
      }
      await newPost.save();
      return newPost;
    } catch (error) {
      throw error;  
    }
  }

  async addReaction(postId, userId, reaction) {
    try {
      // Validate reaction
      if (
        reaction !== null &&
        !["Like", "Love", "Care", "Haha", "Wow", "Sad", "Angry"].includes(
          reaction
        )
      ) {
        throw new Error("Invalid reaction");
      }

      // Check if the post exists
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }

      // Check if a Reactions document already exists for this post
      let reactions = await Reactions.findOne({ postId });

      // If no Reactions document exists, create one
      if (!reactions) {
        reactions = new Reactions({ postId });
      }

      // Check if the user has already reacted
      const existingReaction = reactions.reactions.find(
        (react) => react.userId.toString() === userId
      );

      if (existingReaction) {
        // Update the existing reaction or remove it if the new reaction is null
        if (reaction === null) {
          reactions.reactions.pull({ userId });
        } else {
          existingReaction.reaction = reaction;
        }
      } else if (reaction !== null) {
        // Add a new interaction if the reaction is not null
        reactions.reactions.push({ userId, reaction });
      }

      await reactions.save();

      // Update the Post document with the reference to the Reactions document
      post.reactions = reactions._id;
      await post.save();

      return post;
    } catch (error) {
      throw error;
    }
  }

  async getReactionByUserIdAndPostId(userId, postId) {
    try {
      const postReaction = await Reactions.findOne({ postId: postId });

      if (!postReaction) {
        return null;
      }

      const reaction = postReaction.reactions.find(
        (r) => r.userId && r.userId.equals(userId)
      );
      return reaction;
    } catch (error) {
      throw error;
    }
  }

  async getAllReaction(postId) {
    try {
      const postReaction = await Reactions.findOne({ postId: postId });
      return postReaction || null;
    } catch (error) {
      throw error;
    }
  }
}

export default new PostService();
