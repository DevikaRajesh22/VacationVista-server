import { Request,Response } from "express";
import buyerUseCase from "../../useCase/buyerUseCase";

class buyerController{
    private buyercase:buyerUseCase
    constructor(buyercase:buyerUseCase){
        this.buyercase=buyercase
    }
    async verifyEmail(req:Request,res:Response){
        console.log('verifyEmail controller function')
        const { email, password, name } = req.body;
        const buyerData:any=await this.buyercase.findUser(name,email,password);
        console.log('buyerdata',buyerData)
    }
}

export default buyerController