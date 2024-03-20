import Buyer from "../domain/buyer";
import IBuyerRepository from "./interface/IBuyerRepository";
import otpGenerate from "../infrastructure/utils/otpGenerate";
import sendMail from "../infrastructure/utils/sendMail";

class buyerUseCase {
  private iBuyerRepository: IBuyerRepository;
  private otpGenerate: otpGenerate;
  private sendMail: sendMail;

  constructor(
    iBuyerRepository: IBuyerRepository,
    otpGenerate: otpGenerate,
    sendMail: sendMail
  ) {
    this.iBuyerRepository = iBuyerRepository;
    this.otpGenerate = otpGenerate;
    this.sendMail = sendMail;
  }

  async findBuyer(name: string, email: string, password: string) {
    try {
      console.log("inside findUser usecase");
      const buyerFound = await this.iBuyerRepository.findByEmail(email)
      if (buyerFound) {
        console.log("buyer found");
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
      console.log("error in buyer usecase", error);
    }
  }
}

export default buyerUseCase;
