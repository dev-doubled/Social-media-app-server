import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import util from "util";
import EmailService from "./EmailService.js";
import { User } from "../models/User/User.js";
import { generateVerificationCode } from "../utils/GenerateVerificationCode.js";

class AuthService {
  async login(loginData) {
    try {
      let user;
      if (validator.isEmail(loginData.username)) {
        user = await User.findOne({ email: loginData.username });
      } else if (validator.isMobilePhone(loginData.username)) {
        user = await User.findOne({ phone: loginData.username });
      } else {
        throw new Error(
          "Invalid mobile number or email address. Please provide a valid email or mobile number."
        );
      }
      if (!user) {
        throw new Error("User not found. Please check your credentials.");
      }

      if (!user.status) {
        throw new Error("Your account has not been activated.");
      }

      if (user.loginAttempts >= 5) {
        throw new Error("Account is locked.");
      }

      if (loginData.password) {
        const isPasswordValid = await bcrypt.compare(
          loginData.password,
          user.password
        );

        if (!isPasswordValid) {
          // Increment the login attempts
          user.loginAttempts += 1;
          await user.save();

          // If login attempts exceed the limit, deactivate the account send email to recovery account
          if (user.loginAttempts >= 5) {
            if (!user.recoveryCode) {
              // If recovery code doesn't exist, generate and save one
              const recoveryCode = generateVerificationCode(6);
              user.recoveryCode = recoveryCode;
              await user.save();
              // Send recovery email
              await EmailService.sendRecoveryEmail(user);
            } else {
              await EmailService.sendRecoveryEmail(user);
            }
            user.status = false;
            await user.save();
            throw new Error("Account is locked.");
          }

          throw new Error("Password incorrect. Please check your credentials.");
        }

        // Check active in account
        if (!user.status) {
          throw new Error("Your account has not been activated.");
        }

        // Create a access token
        const accessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "1m" }
        );

        // Create a refresh token
        const refreshToken = jwt.sign(
          { userId: user._id },
          process.env.REFRESH_TOKEN_SECRET_KEY
        );

        user.refreshToken = refreshToken;
        user.loginAttempts = 0;
        await user.save();

        return { accessToken, refreshToken };
      } else {
        throw new Error("Password is required for login.");
      }
    } catch (error) {
      throw error;
    }
  }

  async signup(userData) {
    try {
      let newUser = new User(userData);

      if (validator.isEmail(userData.userName)) {
        const existingUser = await User.findOne({ email: userData.userName });
        if (existingUser) {
          throw new Error(
            "The email you're trying to verify was recently used to verify a different account. Please try a different email."
          );
        }
        newUser.email = userData.userName;
      } else if (
        validator.isMobilePhone(userData.userName, "any", { strictMode: false })
      ) {
        const existingUser = await User.findOne({ phone: userData.userName });
        if (existingUser) {
          throw new Error(
            "The phone number you're trying to verify was recently used to verify a different account. Please try a different number."
          );
        }
        newUser.phone = userData.userName;
      } else {
        throw new Error(
          "Invalid mobile number or email address. Please provide a valid email or mobile number."
        );
      }

      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        newUser.password = hashedPassword;
      }

      const confirmationToken = jwt.sign(
        { email: newUser.email },
        process.env.CONFIRMATION_TOKEN_SECRET_KEY,
        { expiresIn: "15m" }
      );
      newUser.confirmationToken = confirmationToken;

      const verificationCode = generateVerificationCode();
      newUser.verificationCode.code = verificationCode;
      newUser.verificationCode.expireIn = Date.now() + 15 * 60 * 1000;

      newUser.userAvatar =
        "https://firebasestorage.googleapis.com/v0/b/social-media-app-44a6c.appspot.com/o/user-default.png?alt=media&token=cb979468-87df-4233-9def-57459113250e";
      await newUser.save();

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(email, token) {
    try {
      const user = await User.findOne({ email: email });
      if (user && !user.status) {
        const verifyAsync = util.promisify(jwt.verify);
        const decoded = await verifyAsync(
          token,
          process.env.CONFIRMATION_TOKEN_SECRET_KEY
        );

        if (decoded.email === email) {
          try {
            user.status = true;
            user.confirmationToken = undefined;
            user.verificationCode = undefined;
            await user.save();
          } catch (expirationError) {
            throw expirationError;
          }
        } else {
          throw new Error("Invalid token or user not found.");
        }
      } else {
        throw new Error("Invalid token or user not found.");
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyCode(email, code) {
    try {
      const user = await User.findOne({ email: email });
      if (user && !user.status) {
        if (user.verificationCode.code === code) {
          try {
            if (Date.now() > user.verificationCode.expireIn) {
              throw new Error("Verification code has expired.");
            }
            user.status = true;
            user.confirmationToken = undefined;
            user.verificationCode = undefined;
            await user.save();
          } catch (expirationError) {
            throw expirationError;
          }
        } else {
          throw new Error("Invalid code.");
        }
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyRecoveryCode(email, code) {
    try {
      const user = await User.findOne({ email: email });
      if (user && !user.status && user.loginAttempts === 5) {
        if (user.recoveryCode === code) {
          user.status = true;
          user.loginAttempts = 0;
          await user.save();
        } else {
          throw new Error("Invalid code.");
        }
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      throw error;
    }
  }

  async getConfirmationToken(username) {
    try {
      let user;
      if (validator.isEmail(username)) {
        user = await User.findOne({ email: username });
      } else if (validator.isMobilePhone(username)) {
        user = await User.findOne({ phone: username });
      }
      const confirmationToken = user.confirmationToken;
      return confirmationToken;
    } catch (error) {
      throw error;
    }
  }

  async reSend(email) {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const newConfirmationToken = jwt.sign(
          { email: email },
          process.env.CONFIRMATION_TOKEN_SECRET_KEY,
          { expiresIn: "1m" }
        );
        user.confirmationToken = newConfirmationToken;

        const newVerificationCode = generateVerificationCode();
        user.verificationCode.code = newVerificationCode;
        user.verificationCode.expireIn = Date.now() + 60 * 1000;

        await user.save();
        return user;
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error("Refresh token is missing.");
      }

      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );

      const user = await User.findById(decodedRefreshToken.userId);

      if (!user) {
        throw new Error("User not found.");
      }

      if (user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token.");
      }

      const newAccessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1m" }
      );

      return newAccessToken;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
