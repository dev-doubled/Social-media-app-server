import validator from "validator";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

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

      if(userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        user.password = hashedPassword;
        user.save();
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
