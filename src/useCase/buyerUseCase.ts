import Buyer from "../domain/buyer";
import IBuyerRepository from "./interface/IBuyerRepository";
import otpGenerate from "../infrastructure/utils/otpGenerate";
import sendMail from "../infrastructure/utils/sendMail";
import hashPassword from "../infrastructure/utils/hashPassword";
import JWTtoken from "../infrastructure/utils/JWTtoken";
import jwt from "jsonwebtoken";
import { decode } from "punycode";

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

  async resendOtpDecode(token: string) {
    try {
      const decodedToken = this.JWTtoken.verifyJwt(token);
      if (!decodedToken) {
        return { success: false, message: "Invalid token !!" };
      }
      return decodedToken;
    } catch (error) {
      console.log(error);
    }
  }

  async resendOtpEncode(buyerInfo:any){
    try{
      console.log('enc')
      const { otp, ...buyerData } = buyerInfo; 
      const payload = { ...buyerData, otp };
      const updatedToken = this.JWTtoken.createJwt(payload, "buyer");
      return updatedToken;
    }catch(error){
      console.log(error)
    }
  }

  async resendOtp(buyer: Buyer) {
    try {
      console.log('resend usecase')
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
        console.log(decodeToken.otp,buyerOtp)
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

  async buyerLogin(email: string, password: string) {
    try {
      const buyerFound: any = await this.iBuyerRepository.findByEmail(email);
      if (buyerFound) {
        let passwordMatch = await this.hashPassword.compare(
          password,
          buyerFound.password
        );
        if (!passwordMatch) {
          return { success: false, message: "Incorrect password" };
        } else if (buyerFound.isBlocked) {
          return { success: false, message: "User is blocked by admin!" };
        } else {
          let token = this.JWTtoken.createJwt(buyerFound._id, "buyer");
          return { success: true, token: token };
        }
      } else {
        return { success: false, message: "Email not found" };
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

  async buyerGetProfile(buyerId:string){
    try{
      console.log('profile usecase')
      const buyer=await this.iBuyerRepository.findBuyerById(buyerId)
      return buyer
    }catch(error){
      console.log(error)
    }
  }
}

export default buyerUseCase;
