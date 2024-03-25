import Buyer from '../../domain/buyer';

interface IBuyerRepository {
    findByEmail(email: string): Promise<Buyer | null>,
    saveBuyer(buyer: Buyer): Promise<Buyer>,
}

export default IBuyerRepository;