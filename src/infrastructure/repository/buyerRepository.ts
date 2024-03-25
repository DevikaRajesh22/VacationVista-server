import Buyer from "../../domain/buyer";
import { BuyerModel } from "../database/buyerModel";
import IBuyerRepository from "../../useCase/interface/IBuyerRepository";


class buyerRepository implements IBuyerRepository {

    async findByEmail(email: string) {
        const buyerExists=await BuyerModel.findOne({email:email});
        if(buyerExists){
            return buyerExists;
        }else{
            return null
        }  
    }

    async saveBuyer(buyer: Buyer): Promise<any> {
        const newBuyer=new BuyerModel(buyer)
        await newBuyer.save()
        return newBuyer
    }
}

export default buyerRepository