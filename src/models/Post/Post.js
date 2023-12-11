import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    author: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      userName: {
        type: String,
        required: true,
      },
      userAvatar: {
        type: String,
      },
    },
    caption: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    reactions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reactions",
      default: null,
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", schema);
