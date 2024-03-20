import { Request, Response } from "express";
import buyerUseCase from "../../useCase/buyerUseCase";

class buyerController {
  private buyercase: buyerUseCase;
  constructor(buyercase: buyerUseCase) {
    this.buyercase = buyercase;
  }
  async verifyEmail(req: Request, res: Response) {
    try {
      console.log("verifyEmail controller function");
      const { email, password, name } = req.body;
      const buyerData: any = await this.buyercase.findBuyer(
        name,
        email,
        password
      );
      console.log("buyerdata", buyerData);
      if (!buyerData.data.data) {
        req.app.locals.buyer = { email, password, name };
        req.app.locals.otp = buyerData?.data?.otp;
        console.log('locls',req.app.locals);
        res.status(200).json(buyerData?.data);
      } else {
        res.status(409).json({ data: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default buyerController;
