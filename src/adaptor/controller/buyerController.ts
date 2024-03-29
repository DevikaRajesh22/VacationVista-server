import { Request, Response } from "express";
import buyerUseCase from "../../useCase/buyerUseCase";
import Buyer from "../../domain/buyer";
import JWTtoken from "../../infrastructure/utils/JWTtoken";

class buyerController {
  private buyercase: buyerUseCase;
  constructor(buyercase: buyerUseCase) {
    this.buyercase = buyercase;
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const buyerInfo = req.body;
      const buyerData: any = await this.buyercase.findBuyer(buyerInfo as Buyer);
      console.log(buyerData);
      if (!buyerData.data.data) {
        const token = buyerData?.token;
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
      let token = req.headers.authorization?.split(" ")[1] as string;
      const buyerOtp: string = req.body.otp;
      const saveBuyer = await this.buyercase.saveBuyer(token, buyerOtp);
      if (saveBuyer?.success) {
        res.cookie("buyerToken", saveBuyer.token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        return res.status(200).json(saveBuyer);
      } else {
        res
          .status(402)
          .json({
            success: false,
            message: saveBuyer
              ? saveBuyer.message
              : "Verifying unsuccessfull...",
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async resendOtp(req: Request, res: Response) {
    try {
      console.log(req.body)
      let token = req.headers.authorization?.split(" ")[1] as string;
      const buyerOtp: string = req.body.otp;
      const saveBuyer = await this.buyercase.saveBuyer(token, buyerOtp);
      if (saveBuyer?.success) {
        res.cookie("buyerToken", saveBuyer.token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        return res.status(200).json(saveBuyer);
      } else {
        res
          .status(402)
          .json({
            success: false,
            message: saveBuyer
              ? saveBuyer.message
              : "Verifying unsuccessfull...",
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const buyer = await this.buyercase.buyerLogin(email, password);
      if (buyer?.success) {
        res.cookie("buyerToken", buyer.token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({ success: true, token: buyer.token });
      } else {
        res.status(401).json({ success: false, message: buyer?.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.cookie("buyerToken", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }

  async gsignup(req: Request, res: Response) {
    const { email, name, password } = req.body;
    const buyer = await this.buyercase.gSignup(name, email, password);
    res.status(200).json(buyer);
  }

  async profile(req: Request, res: Response) {
    try {
      console.log("profile controller",req.buyerId);
      const buyerId=req.buyerId
      if(buyerId){
        const buyerProfile=await this.buyercase.buyerGetProfile(buyerId)
        if(buyerProfile){
          return res.status(200).json({success:true,buyerProfile})
        }else{
          return res.status(401).json({success:false,message:'Authentication error'})
        }
      }else{
        return res.status(401).json({success:false,message:'User id not found'})
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default buyerController;
