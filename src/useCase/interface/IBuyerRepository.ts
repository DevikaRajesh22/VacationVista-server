import Buyer from '../../domain/buyer';

interface IBuyerRepository {
    findByEmail(email: string): Promise<Buyer | null>,
    // saveBuyer(buyer: Buyer): Promise<Buyer>,
    // changePassword(email: string, password: string): Promise<void>,
    // getProperty(page: number): Promise<any>
}

export default IBuyerRepository;