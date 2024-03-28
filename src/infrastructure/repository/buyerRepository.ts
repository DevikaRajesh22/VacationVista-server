import Buyer from "../../domain/buyer";
import { BuyerModel } from "../database/buyerModel";
import IBuyerRepository from "../../useCase/interface/IBuyerRepository";

class buyerRepository implements IBuyerRepository {
  async findByEmail(email: string) {
    try {
      const buyerExists = await BuyerModel.findOne({ email: email });
      if (buyerExists) {
        return buyerExists;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async saveBuyer(buyer: Buyer) {
    try {
      const newBuyer = new BuyerModel(buyer);
      await newBuyer.save();
      return newBuyer
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findBuyerById(id:string):Promise<Buyer|null>{
    try{
      console.log('findbuyerbyid')
      let buyerData:Buyer|null=await BuyerModel.findById(id)
      console.log(buyerData)
      return buyerData
    }catch(error){
      console.log(error)
      return null
    }
  }
}

export default buyerRepository;
