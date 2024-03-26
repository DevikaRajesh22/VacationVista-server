import Admin from "../../domain/admin";
import { AdminModel } from "../database/adminModel";
import IAdminRepository from "../../useCase/interface/IAdminRepository";

class adminRepository implements IAdminRepository{
   async findByEmail(email: string): Promise<Admin | null> {
       const adminExists=await AdminModel.findOne({email:email})
       if(adminExists){
        return adminExists
       }else{
        return null
       }
   }
}

export default adminRepository