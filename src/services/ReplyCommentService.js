import { Comments } from "../models/Post/Comments.js";
import { ReplyComments } from "../models/Post/ReplyComments.js";

class ReplyCommentService {
  async getAllReplyComments() {
    try {
      const replyComments = await ReplyComments.find({});
      return replyComments;
    } catch (error) {
      throw error;
    }
  }

  async getReplyCommentByCommentId(commentId) {
    try {
      const comments = await ReplyComments.findOne({
        commentID: commentId,
      });
      if (!comments) {
        return [];
      }
      const sortedReplyComments = comments.replyComments.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      return sortedReplyComments;
    } catch (error) {
      throw error;
    }
  }

  async createReplyComment(replyCommentData) {
    try {
      const { commentID, ...replyCommentFields } = replyCommentData;
      // Find the existing ReplyComments document by commentID
      let existingReplyComments = await ReplyComments.findOne({ commentID });
      let foundComment = null;

      if (!existingReplyComments) {
        existingReplyComments = await ReplyComments.create({
          commentID,
          replyComments: [
            {
              author: replyCommentFields.author,
              replyContent: replyCommentFields.replyContent,
              createdAt: new Date(),
            },
          ],
        });
        //Find comment inside comments in Comments Collection
        const commentsArray = await Comments.find({});
        for (const comments of commentsArray) {
          for (const comment of comments.comments) {
            if (comment._id.toString() === commentID) {
              foundComment = comment;
              break;
            }
          }
          if (foundComment) {
            break;
          }
        }
        //Update replies inside Comments collection
        if (foundComment) {
          await Comments.findOneAndUpdate(
            { "comments._id": foundComment._id },
            { $set: { "comments.$.replies": existingReplyComments._id } },
            { new: true }
          );
        }
      } else {
        // Push new comment into reply comments with same comment ID
        const newReplyComment = {
          author: replyCommentFields.author,
          replyContent: replyCommentFields.replyContent,
          createdAt: new Date(),
        };

        existingReplyComments.replyComments.push(newReplyComment);
        await existingReplyComments.save();
      }

      return existingReplyComments.replyComments;
    } catch (error) {
      throw error;
    }
  }
}
export default new ReplyCommentService();
