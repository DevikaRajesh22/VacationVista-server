import Buyer from "../domain/buyer";
import IBuyerRepository from "./interface/IBuyerRepository";
import otpGenerate from "../infrastructure/utils/otpGenerate";
import sendMail from "../infrastructure/utils/sendMail";
import hashPassword from "../infrastructure/utils/hashPassword";

class buyerUseCase {
  private iBuyerRepository: IBuyerRepository;
  private otpGenerate: otpGenerate;
  private sendMail: sendMail;
  private hashPassword:hashPassword

  constructor(
    iBuyerRepository: IBuyerRepository,
    otpGenerate: otpGenerate,
    sendMail: sendMail,
    hashPassword:hashPassword
  ) {
    this.iBuyerRepository = iBuyerRepository;
    this.otpGenerate = otpGenerate;
    this.sendMail = sendMail;
    this.hashPassword=hashPassword
  }

  async findBuyer(name: string, email: string, password: string) {
    try {
      const buyerFound = await this.iBuyerRepository.findByEmail(email)
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

  async resendOtp(buyer:Buyer){
    try{
      const {name,email}=buyer
      const otp=await this.otpGenerate.generateOtp(4)
      console.log(`OTP : ${otp}`)
      const mail=await this.sendMail.sendMail(name,email,otp)
      return{
        status:200,
        data:{
          data:false,
          otp:otp,
        }
      } 
    }catch(error){
      console.log(error)
    }
  }

  async saveBuyer(buyer:Buyer){
    try{
      const hashedPassword=await this.hashPassword.createHash(buyer.password)
      buyer.password=hashedPassword
      const buyerSave=await this.iBuyerRepository.saveBuyer(buyer)
      return{
        status:200,
        data:buyerSave
      }
    }catch(error){
      console.log(error)
    }
  }
}

export default buyerUseCase;
