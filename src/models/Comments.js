import mongoose from "mongoose";

const schema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  comments: [
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
      commentContent: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      replies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReplyComments",
        default: null,
      },
    },
  ],
});

export const Comments = mongoose.model("Comments", schema);
