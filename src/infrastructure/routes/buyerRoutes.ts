import buyerController from "../../adaptor/controller/buyerController";
import buyerRepository from "../repository/buyerRepository";
import buyerUseCase from "../../useCase/buyerUseCase";
import express from "express";
import otpGenerate from "../utils/otpGenerate";
import sendMail from "../utils/sendMail";
import hashPassword from '../utils/hashPassword';
import JWTtoken from "../utils/JWTtoken";

const repository=new buyerRepository()
const otp=new otpGenerate()
const otpSend=new sendMail()
const hashPwd=new hashPassword()
const jwt=new JWTtoken() 

const buyercase=new buyerUseCase(repository,otp,otpSend,hashPwd,jwt)
const controller=new buyerController(buyercase)

const router = express.Router()

router.post('/verifyMail',(req,res)=>{controller.verifyEmail(req,res)});
router.post('/verifyOtp',(req,res)=>{controller.verifyOtp(req,res)});
router.post('/resendOtp',(req,res)=>{controller.resendOtp(req,res)});
router.post('/login',(req,res)=>{controller.login(req,res)});

export default router