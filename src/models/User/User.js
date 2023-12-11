import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userAvatar: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    surName: {
      type: String,
      default: "",
    },
    photos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    gender: {
      type: Boolean,
    },
    dob: {
      type: String,
    },
    password: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
    confirmationToken: {
      type: String,
    },
    verificationCode: {
      code: {
        type: String,
      },
      expireIn: {
        type: String,
      },
    },
    recoveryCode: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
