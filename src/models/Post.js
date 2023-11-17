import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    author: {
      //userID
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
    interact: {
      reaction: {
        type: String,
        default: null,
      },
      count: {
        type: Number,
        default: 0,
      },
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
