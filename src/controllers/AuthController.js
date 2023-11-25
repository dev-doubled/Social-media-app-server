import AuthService from "../services/AuthService.js";
import EmailService from "../services/EmailService.js";

class PostController {
  // [POST] /api/v1/auth/login
  async login(req, res, next) {
    try {
      const loginData = req.body;
      const loginInfo = await AuthService.login(loginData);
      res.status(200).json(loginInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
  // [POST] /api/v1/auth/signup
  async signup(req, res, next) {
    try {
      const userData = await AuthService.signup(req.body);
      if (userData) {
        //If user name is an email
        if (userData.email) {
          await EmailService.sendConfirmationEmail(userData);
          res.status(200).json(userData);
        }
        //If user name is mobile phone number
        else if (userData.phone) {
          res.status(200).json(userData);
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
  // [GET] /api/v1/auth/confirm/token/:email/:token
  async verifyEmail(req, res, next) {
    const { email, token } = req.params;
    try {
      await AuthService.verifyEmail(email, token);
      res.redirect(
        `http://localhost:3000/login?message=success&email=${encodeURIComponent(
          email
        )}`
      );
    } catch (error) {
      if (error.message === "jwt expired") {
        res.redirect(
          `http://localhost:3000/login?message=fail&email=${encodeURIComponent(
            email
          )}`
        );
      }
      next();
    }
  }
  // [GET] /api/v1/auth/confirm/token/v2/:email/:token
  async verifyEmailV2(req, res, next) {
    const { email, token } = req.params;
    try {
      await AuthService.verifyEmail(email, token);
      res.status(200).json("success");
    } catch (error) {
      res.status(500).json("Fail");
      next();
    }
  }
  // [GET] /api/v1/auth/confirm/code/:email/:code
  async verifyCode(req, res, next) {
    const { email, code } = req.params;
    try {
      await AuthService.verifyCode(email, code);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      res.status(500).json({ message: "Fail", error: error.message });
      next();
    }
  }
  // [GET] /api/v1/auth/confirm/recovery/:email/:code
  async verifyRecoveryCode(req, res, next) {
    const { email, code } = req.params;
    try {
      await AuthService.verifyRecoveryCode(email, code);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      res.status(500).json({ message: "Fail", error: error.message });
      next();
    }
  }
  // [GET] /api/v1/auth/confirm/get-confirm-token
  async getConfirmToken(req, res, next) {
    try {
      const { username } = req.params;
      const confirmationToken = await AuthService.getConfirmationToken(
        username
      );
      res.status(200).json({ confirmationToken: confirmationToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
  // [GET] /api/v1/auth/re-send/:email
  async reSend(req, res, next) {
    const { email } = req.params;
    try {
      const user = await AuthService.reSend(email);
      await EmailService.sendConfirmationEmail(user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
  // [POST] /api/v1/auth/token
  async refreshAccessToken(req, res, next) {
    const { refreshToken } = req.body;
    try {
      const newAccessToken = await AuthService.refreshAccessToken(refreshToken);
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new PostController();
