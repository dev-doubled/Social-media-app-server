import nodemailer from "nodemailer";
import { confirmEmailForm } from "../utils/ConfirmEmailForm.js";
import { recoveryEmailForm } from "../utils/RecoveryEmailForm.js";
class EmailService {
  // Function to create and return mailOptions
  createMailOptions = (config) => {
    return {
      from: process.env.GMAIL_ACCOUNT,
      to: config.to,
      subject: config.subject,
      html: config.html,
    };
  };

  // Function to send email based on configuration
  sendEmail = async (config) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = this.createMailOptions(config);

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  sendConfirmationEmail = async (userData) => {
    const confirmationEmailConfig = {
      to: userData.email,
      subject: `FB-${userData.verificationCode.code} is your Facebook confirmation code`,
      html: confirmEmailForm(userData),
    };
    try {
      await this.sendEmail(confirmationEmailConfig);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      throw error;
    }
  };

  sendRecoveryEmail = async (userData) => {
    const recoveryEmailConfig = {
      to: userData.email,
      subject: `${userData.recoveryCode} is your Facebook account recovery code`,
      html: recoveryEmailForm(userData),
    };
    try {
      await this.sendEmail(recoveryEmailConfig);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      throw error;
    }
  };
}

export default new EmailService();
