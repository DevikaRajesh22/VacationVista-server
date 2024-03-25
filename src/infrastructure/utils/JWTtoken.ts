import IJwtToken from "../../useCase/interface/IJwtToken";
import jwt from 'jsonwebtoken'

class JWTtoken implements IJwtToken{
    createJwt(buyerId: string, role: string): string {
        const jwtKey=process.env.JWT_KEY
        if(jwtKey){
            const token:string=jwt.sign({id:buyerId,role:role},jwtKey)
            return token
        }
        throw new Error('JWT key is not defined')
    }
}

export default JWTtoken