import adminController from "../../adaptor/controller/adminController";
import adminRepository from "../repository/adminRepository";
import adminUseCase from "../../useCase/adminUseCase";
import express from "express";
import hashPassword from "../utils/hashPassword";
import JWTtoken from "../utils/JWTtoken";

const repository=new adminRepository()
const hashPwd=new hashPassword()
const jwt=new JWTtoken()

const admincase=new adminUseCase(repository,hashPwd,jwt)
const controller=new adminController(admincase)

const router = express.Router()

router.post('/login',(req,res)=>{controller.login(req,res)});
router.post('/logout',(req,res)=>{controller.logout(req,res)});

export default router