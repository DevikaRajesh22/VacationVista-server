import { Request, Response } from "express";
import adminUseCase from "../../useCase/adminUseCase";

class adminController {
  private admincase: adminUseCase;
  constructor(admincase: adminUseCase) {
    this.admincase = admincase;
  }

  async login(req: Request, res: Response) {
    try {
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

  async logout(req:Request,res:Response){
    try{
        res.cookie("adminJWT","",{
            httpOnly:true,
            expires:new Date(0)
        });
        res.status(200).json({success:true})
    }catch(error){
        console.log(error)
    }
  }
}

export default adminController;
