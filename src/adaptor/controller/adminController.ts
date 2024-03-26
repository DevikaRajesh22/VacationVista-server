import { Request, Response } from "express";
import adminUseCase from "../../useCase/adminUseCase";

class adminController {
  private admincase: adminUseCase;
  constructor(admincase: adminUseCase) {
    this.admincase = admincase;
  }

  async login(req: Request, res: Response) {
    try {
      console.log("controller");
      const admin = await this.admincase.adminLogin(req.body);
      if (
        admin &&
        admin.data &&
        typeof admin.data == "object" &&
        "token" in admin.data
      ) {
        res.cookie("adminJWT", admin.data.token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
      }
      res.status(admin!.status).json(admin!.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default adminController;
