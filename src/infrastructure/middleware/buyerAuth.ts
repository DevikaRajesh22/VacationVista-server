import {Request,Response,NextFunction} from 'express'
import {JwtPayload} from 'jsonwebtoken'
import JWT from '../utils/JWTtoken'
import dotenv from 'dotenv'
import buyerRepository from '../repository/buyerRepository'
import { decode } from 'punycode'

const jwt=new JWT()

const repository=new buyerRepository()
dotenv.config()

declare global{
    namespace Express{
        interface Request{
            buyerId?:string
        }
    }
}

const buyerAuth=async(req:Request,res:Response,next:NextFunction)=>{
    console.log('buyer auth')
    console.log(req.cookies)
    let token=req.cookies.buyerToken
    console.log(token)
    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized - No token provided"})
    }
    try{
        const decodeToken=jwt.verifyJwt(token)
        console.log('decodeToken',decodeToken)
        if(decodeToken && decodeToken.role!='buyer'){
            return res.status(401).send({success:false,message:"Unauthorized - Invalid token"})
        }
        if(decodeToken && decodeToken.id){
            let buyer=await repository.findBuyerById(decodeToken?.id)
            if(decodeToken?.isBlocked){
                return res.status(401).send({success:false,message:'User is blocked !!'})
            }else{
                req.buyerId=decodeToken.id
                next()
            }
        }else{
            return res.status(401).send({success:false,message:"Unauthorized - Invalid token"})
        }
    }catch(error){
        console.log(error)
        return res.status(401).send({success:false,message:"Unauthorized - Invalid token"})
    }
}

export default buyerAuth;