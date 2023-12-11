import validator from "validator";
import bcrypt from "bcrypt";
import { User } from "../models/User/User.js";
import { Comments } from "../models/Post/Comments.js";
import { ReplyComments } from "../models/Post/ReplyComments.js";
class UserService {
  async getAllUsers() {}

  async getUser(username) {
    try {
      let user;
      if (validator.isEmail(username)) {
        user = await User.findOne({ email: username });
      } else if (validator.isMobilePhone(username)) {
        user = await User.findOne({ phone: username });
      } else {
        throw new Error(
          "Invalid mobile number or email address. Please provide a valid email or mobile number."
        );
      }
      if (!user) {
        throw new Error("User not found. Please check your credentials.");
      }

      return {
        userID: user._id,
        firstName: user.firstName,
        surName: user.surName,
        userAvatar: user.userAvatar,
        email: user.email,
      };
    } catch (error) {
      throw error;
    }
  }

  async getInfo(userId) {
    try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        throw new Error("User not found.");
      }

      return {
        userId: user._id,
        firstName: user.firstName,
        surName: user.surName,
        userAvatar: user.userAvatar,
        coverPicture: user.coverPicture,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userData) {
    try {
      let user;
      if (validator.isEmail(userData.username)) {
        user = await User.findOne({ email: userData.username });
      } else if (validator.isMobilePhone(userData.username)) {
        user = await User.findOne({ phone: userData.username });
      } else {
        throw new Error(
          "Invalid mobile number or email address. Please provide a valid email or mobile number."
        );
      }
      if (!user) {
        throw new Error("User not found. Please check your credentials.");
      }

      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        user.password = hashedPassword;
        user.save();
      }
    } catch (error) {
      throw error;
    }
  }

  async updateCoverImage(userId, coverImage) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found.");
      }
      user.coverPicture = coverImage;
      await user.save();
      return {
        userId: user._id,
        firstName: user.firstName,
        surName: user.surName,
        userAvatar: user.userAvatar,
        coverPicture: user.coverPicture,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUserAvatar(userId, userAvatar) {
    try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        throw new Error("User not found.");
      }

      // Save the current user avatar for later comparison
      const oldAvatar = user.userAvatar;
      // Update user avatar
      user.userAvatar = userAvatar;
      await user.save();

      // Update user avatar in comments if it has changed
      if (oldAvatar !== userAvatar) {
        await Comments.updateMany(
          { "comments.author.userId": userId },
          { $set: { "comments.$[].author.userAvatar": userAvatar } }
        );
      }

      // Update user avatar in reply comments if it has changed
      if (oldAvatar !== userAvatar) {
        await ReplyComments.updateMany(
          { "replyComments.author.userId": userId },
          { $set: { "replyComments.$[].author.userAvatar": userAvatar } }
        );
      }

      return {
        userId: user._id,
        firstName: user.firstName,
        surName: user.surName,
        userAvatar: user.userAvatar,
        coverPicture: user.coverPicture,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
      };
    } catch (error) {
      throw error;
    }
  }

  //Extra methods
  async getUserCoverImage(userId) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found.");
      }
      return user.coverPicture;
    } catch (error) {
      throw error;
    }
  }
  
  async checkUserExist(userId) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
