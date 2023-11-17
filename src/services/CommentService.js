import { Post } from "../models/Post.js";
import { Comments } from "../models/Comments.js";

class CommentService {
  async getAllComments() {
    try {
      const comments = await Comments.find({});
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async createComment(commentData) {
    try {
      const { postID, ...commentFields } = commentData;
      let existingComments = await Comments.findOne({ postID });

      if (!existingComments) {
        existingComments = await Comments.create({
          postID,
          comments: [
            {
              author: commentFields.author,
              commentContent: commentFields.commentContent,
              createdAt: new Date(),
              replies: null,
            },
          ],
        });
        const post = await Post.findById(postID);
        if (post) {
          post.comments = existingComments._id;
          await post.save();
        }
      } else {
        const newComment = {
          author: commentFields.author,
          commentContent: commentFields.commentContent,
          createdAt: new Date(),
          replies: null,
        };
        existingComments.comments.push(newComment);
        await existingComments.save();
      }

      return existingComments.comments;
    } catch (error) {
      throw error;
    }
  }
}

export default new CommentService();
