import buyerController from "../../adaptor/controller/buyerController";
import buyerRepository from "../repository/buyerRepository";
import buyerUseCase from "../../useCase/buyerUseCase";
import express from "express";
import otpGenerate from "../utils/otpGenerate";
import sendMail from "../utils/sendMail";

const repository=new buyerRepository()
const otp=new otpGenerate()
const otpSend=new sendMail()

const buyercase=new buyerUseCase(repository,otp,otpSend)
const controller=new buyerController(buyercase)

const router = express.Router()

router.post('/verifymail',(req,res)=>{controller.verifyEmail(req,res)});

export default router