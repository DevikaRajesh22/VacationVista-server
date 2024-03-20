import Buyer from "../../domain/buyer";
import { BuyerModel } from "../database/buyerModel";
import { PropertyModel } from "../database/propertyModel";
import IBuyerRepository from "../../useCase/interface/IBuyerRepository";
import { deflate } from "zlib";


class buyerRepository implements IBuyerRepository {
    async findByEmail(email: string) {
        console.log('findByEmail repository');
        const buyerExists=await BuyerModel.findOne({email:email});
        if(buyerExists){
            return buyerExists;
        }else{
            return null
        }
        
    }
    async saveBuyer(buyer: Buyer): Promise<any> {
        console.log('save buyer repository');
        const newBuyer=new BuyerModel(buyer)
        await newBuyer.save()
        console.log('saved')
        return newBuyer
    }
    // async changePassword(email: string, password: string): Promise<void> {

    // }
    // async getProperty(page: number): Promise<any> {

    // }
}

export default buyerRepository