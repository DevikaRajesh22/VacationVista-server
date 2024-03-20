import nodemailer from "nodemailer";
import INodeMailer from "../../useCase/interface/INodeMailer";
import dotenv from "dotenv";
dotenv.config();

class sendMail {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
  }
  sendMail(name: string, email: string, verificationCode: string): void {
    console.log('send mail utils');
    const emailContent = `
Dear ${name},

Thank you for choosing Vacation Vista for your travel needs!
To ensure the security of your account, we've generated a One-Time Password (OTP) for you to complete your registration or login process.

Your OTP is: ${verificationCode}

Please use this OTP within the next 5 minutes to complete your action. If you did not initiate this request or need any assistance, please contact our support team immediately.
Thank you for trusting Vacation Vista for your travel experiences. We look forward to serving you!

Best regards,
Vacation Vista
`;
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Vacation Vista Verification Code",
      text: emailContent,
    };
    this.transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`otp : ${verificationCode}`);
      }
    });
  }
  forgetSendMail(email: string, verificationCode: string): void {
    const emailContent = `
Thank you for choosing Vacation Vista for your travel needs!
To ensure the security of your account, we've generated a One-Time Password (OTP) for you to complete your registration or login process.

Your OTP is: ${verificationCode}

Please use this OTP within the next 5 minutes to complete your action. If you did not initiate this request or need any assistance, please contact our support team immediately.
Thank you for trusting Vacation Vista for your travel experiences. We look forward to serving you!

Best regards,
Vacation Vista
`;
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Vacation Vista Verification Code",
      text: emailContent,
    };
    this.transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`otp : ${verificationCode}`);
      }
    });
  }
}

export default sendMail
