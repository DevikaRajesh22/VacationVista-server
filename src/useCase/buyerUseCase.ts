import Buyer from "../domain/buyer";
import IBuyerRepository from "./interface/IBuyerRepository";
import otpGenerate from "../infrastructure/utils/otpGenerate";
import sendMail from "../infrastructure/utils/sendMail";
import hashPassword from "../infrastructure/utils/hashPassword";
import JWTtoken from "../infrastructure/utils/JWTtoken";

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

  async findBuyer(name: string, email: string, password: string) {
    try {
      const buyerFound = await this.iBuyerRepository.findByEmail(email);
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
        const mail = await this.sendMail.sendMail(name, email, otp);
        return {
          status: 200,
          data: {
            data: false,
            otp: otp,
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

  async saveBuyer(buyer: Buyer) {
    try {
      const hashedPassword = await this.hashPassword.createHash(buyer.password);
      buyer.password = hashedPassword;
      const buyerSave = await this.iBuyerRepository.saveBuyer(buyer);
      return {
        status: 200,
        data: buyerSave,
      };
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
        console.log(passwordMatch);
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
}

export default buyerUseCase;
