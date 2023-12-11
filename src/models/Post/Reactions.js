import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    reactions: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: null,
        },
        reaction: {
          type: String,
          default: null,
          required: true,
        }
      }
    ]
  },
);

export const Reactions = mongoose.model("Reactions", schema);
