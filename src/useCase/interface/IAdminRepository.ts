import Admin from "../../domain/admin";

interface IAdminRepository{
    findByEmail(email: string): Promise<Admin | null>,
}

export default IAdminRepository