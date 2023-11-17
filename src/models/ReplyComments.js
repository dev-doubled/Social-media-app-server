import mongoose from "mongoose";

const schema = new mongoose.Schema({
  commentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments.comments",
    required: true,
  },
  replyComments: [
    {
      author: {
        userName: {
          type: String,
          required: true,
        },
        userAvatar: {
          type: String,
        },
      },
      replyContent: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const ReplyComments = mongoose.model("ReplyComments", schema);
