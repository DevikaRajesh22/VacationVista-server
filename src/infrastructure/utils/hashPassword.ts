import bcrypt from 'bcrypt'
import IHashPassword from '../../useCase/interface/IHashPassword'

class hashPassword implements IHashPassword{
    async createHash(password: string): Promise<string> {
        const hashedPassword=await bcrypt.hash(password,10)
        console.log('hashed',hashedPassword)
        return hashedPassword
    }
    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const passwordMatch=await bcrypt.compare(password,hashedPassword)
        return passwordMatch
    }
}

export default hashPassword