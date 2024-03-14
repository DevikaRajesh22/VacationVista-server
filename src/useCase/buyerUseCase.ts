import Buyer from "../domain/buyer";
import IBuyerInterface from './interface/IBuyerRepository';

class buyerUseCase {
    private iBuyerInterface: IBuyerInterface
    constructor(iBuyerInterface: IBuyerInterface) {
        this.iBuyerInterface = iBuyerInterface
    }

    async findUser(name:string,email:string,password:string) {
        try {
            console.log('inside findUser usecase');
            return {
                status: 200
            }
        } catch {

        }
    }
}

export default buyerUseCase