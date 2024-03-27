import IJwtToken from "../../useCase/interface/IJwtToken";
import jwt,{JwtPayload} from 'jsonwebtoken'

class JWTtoken implements IJwtToken{
    createJwt(buyerId: string, role: string): string {
        const jwtKey=process.env.JWT_KEY
        if(jwtKey){
            const token:string=jwt.sign({id:buyerId,role:role},jwtKey)
            return token
        }
        throw new Error('JWT key is not defined')
    }
    verifyJwt(token: string): JwtPayload | null {
        try{
            console.log('verify jwt')
            const jwtKey=process.env.JWT_KEY as string
            const decode=jwt.verify(token,jwtKey) as JwtPayload
            console.log(decode)
            return decode
        }catch(error){
            console.log(error)
            return null
        }
    }
}

export default JWTtoken