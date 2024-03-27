import { JwtPayload } from "jsonwebtoken"
interface IJwtToken{
    createJwt(buyerId:string,role:string):string,
    verifyJwt(token:string):JwtPayload|null,
}

export default IJwtToken