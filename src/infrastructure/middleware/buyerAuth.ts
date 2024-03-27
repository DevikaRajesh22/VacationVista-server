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
    let token=req.cookies.token
    console.log(token)
    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized - No token provided"})
    }
    try{
        const decodeToken=jwt.verifyJwt(token)
        if(decodeToken && decodeToken.role!='buyer'){
            return res.status(401).send({success:false,message:"Unauthorized - Invalid token"})
        }
        // if(decodeToken && decodeToken.id){
        //     let buyer=await 
        // }
    }catch(error){
        console.log(error)
    }
}

export default buyerAuth;