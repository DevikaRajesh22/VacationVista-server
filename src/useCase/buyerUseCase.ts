import Buyer from "../domain/buyer";
import IBuyerRepository from "./interface/IBuyerRepository";
import otpGenerate from "../infrastructure/utils/otpGenerate";
import sendMail from "../infrastructure/utils/sendMail";
import hashPassword from "../infrastructure/utils/hashPassword";
import JWTtoken from "../infrastructure/utils/JWTtoken";
import jwt from "jsonwebtoken";

class buyerUseCase {
  private iBuyerRepository: IBuyerRepository;
  private otpGenerate: otpGenerate;
  private sendMail: sendMail;
  private hashPassword: hashPassword;
  private JWTtoken: JWTtoken;

  constructor(
    iBuyerRepository: IBuyerRepository,
    otpGenerate: otpGenerate,
    sendMail: sendMail,
    hashPassword: hashPassword,
    JWTtoken: JWTtoken
  ) {
    this.iBuyerRepository = iBuyerRepository;
    this.otpGenerate = otpGenerate;
    this.sendMail = sendMail;
    this.hashPassword = hashPassword;
    this.JWTtoken = JWTtoken;
  }

  async findBuyer(buyerInfo: Buyer) {
    try {
      const buyerFound = await this.iBuyerRepository.findByEmail(
        buyerInfo.email
      );
      if (buyerFound) {
        return {
          status: 200,
          data: {
            data: true,
          },
        };
      } else {
        const otp = await this.otpGenerate.generateOtp(4);
        console.log(`OTP : ${otp}`);
        let token = jwt.sign(
          { buyerInfo, otp },
          process.env.JWT_KEY as string,
          { expiresIn: "5m" }
        );
        const mail = await this.sendMail.sendMail(
          buyerInfo.name,
          buyerInfo.email,
          otp
        );
        return {
          status: 200,
          data: {
            data: false,
            token: token,
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async resendOtp(buyer: Buyer) {
    try {
      const { name, email } = buyer;
      const otp = await this.otpGenerate.generateOtp(4);
      console.log(`OTP : ${otp}`);
      const mail = await this.sendMail.sendMail(name, email, otp);
      return {
        status: 200,
        data: {
          data: false,
          otp: otp,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  async saveBuyer(token: string, buyerOtp: string) {
    try {
      let decodeToken = this.JWTtoken.verifyJwt(token);
      if (decodeToken) {
        if (buyerOtp == decodeToken.otp) {
          const hashedPassword = await this.hashPassword.createHash(
            decodeToken.buyerInfo.password
          );
          decodeToken.buyerInfo.password = hashedPassword;
          const buyerSave = await this.iBuyerRepository.saveBuyer(
            decodeToken.buyerInfo
          );
          if (buyerSave) {
            let createdToken = this.JWTtoken.createJwt(
              buyerSave._id as string,
              "buyer"
            );
            return { success: true, token };
          } else {
            return { success: false, message: "Internal server error!" };
          }
        } else {
          return { success: false, message: "Incorrect OTP!" };
        }
      } else {
        return { success: false, message: "No token!Try again!" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async buyerLogin(buyer: any) {
    try {
      const buyerFound: any = await this.iBuyerRepository.findByEmail(
        buyer.email
      );
      if (buyerFound) {
        if (buyerFound.isBlocked) {
          return {
            status: 200,
            data: {
              success: false,
              message: "Blocked user !!",
            },
          };
        }
        const passwordMatch = await this.hashPassword.compare(
          buyer.password,
          buyerFound.password
        );
        if (passwordMatch) {
          const token = this.JWTtoken.createJwt(buyerFound._id, "buyer");
          return {
            status: 200,
            data: {
              success: true,
              message: "Authenticated successfully",
              buyerId: buyerFound._id,
              token: token,
            },
          };
        } else {
          return {
            status: 200,
            data: {
              success: false,
              message: "Incorrect password or email",
            },
          };
        }
      } else {
        return {
          status: 200,
          data: {
            success: false,
            message: "Incorrect password or email",
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async gSignup(name: string, email: string, password: string) {
    try {
      const buyerFound = await this.iBuyerRepository.findByEmail(email);
      if (buyerFound) {
        return {
          status: 200,
          data: false,
        };
      } else {
        const hashedPassword = await this.hashPassword.createHash(password);
        const buyerSave = await this.iBuyerRepository.saveBuyer({
          name,
          email,
          password: hashedPassword,
        } as Buyer);
        return {
          status: 200,
          data: buyerSave,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default buyerUseCase;
