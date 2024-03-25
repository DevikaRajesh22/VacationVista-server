import { Request, Response } from "express";
import buyerUseCase from "../../useCase/buyerUseCase";

class buyerController {
  private buyercase: buyerUseCase;
  constructor(buyercase: buyerUseCase) {
    this.buyercase = buyercase;
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const buyerData: any = await this.buyercase.findBuyer(
        name,
        email,
        password
      );
      if (!buyerData.data.data) {
        req.app.locals.buyer = { email, password, name };
        req.app.locals.otp = buyerData?.data?.otp;
        res.status(200).json(buyerData?.data);
      } else {
        res.status(409).json({ data: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const otpFormData: string = req.body.otp;
      const otpLocals: string = req.app.locals.otp;
      if (otpFormData === otpLocals) {
        const buyer = req.app.locals.buyer;
        const saveBuyer = await this.buyercase.saveBuyer(buyer);
        if (saveBuyer) {
          return res.status(saveBuyer.status).json(saveBuyer);
        } else {
          return res.status(400).json({ message: "Invalid otp" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async resendOtp(req: Request, res: Response) {
    try {
      const buyer = req.app.locals.buyer;
      const send = await this.buyercase.resendOtp(buyer);
      req.app.locals.otp = send?.data?.otp;
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const buyer = await this.buyercase.buyerLogin(req.body);
      if (
        buyer &&
        buyer.data &&
        typeof buyer.data == "object" &&
        "token" in buyer.data
      ) {
        res.cookie("buyerJWT", buyer.data.token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
      }
      res.status(buyer!.status).json(buyer!.data);
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.cookie("buyerJWT", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }
}

export default buyerController;
