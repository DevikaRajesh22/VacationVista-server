import Buyer from "../../domain/buyer";
import { BuyerModel } from "../database/buyerModel";
import { PropertyModel } from "../database/propertyModel";
import IBuyerRepository from "../../useCase/interface/IBuyerRepository";
import { deflate } from "zlib";


class buyerRepository implements IBuyerRepository {
    async findByEmail(email: string) {
        const buyerExists=await BuyerModel.findOne({email:email});
        return buyerExists;
    }
    // async saveBuyer(buyer: Buyer): Promise<any> {

    // }
    // async changePassword(email: string, password: string): Promise<void> {

    // }
    // async getProperty(page: number): Promise<any> {

    // }
}

export default buyerRepository