import buyerController from "../../adaptor/controller/buyerController";
import buyerRepository from "../repository/buyerRepository";
import buyerUseCase from "../../useCase/buyerUseCase";
import express from "express";

const repository=new buyerRepository()
const buyercase=new buyerUseCase(repository)
const controller=new buyerController(buyercase)
const router = express.Router()

router.post('/verifymail',(req,res)=>{controller.verifyEmail(req,res)});

export default router