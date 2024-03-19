import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import buyerRoute from '../routes/buyerRoutes'
import sellerRoute from '../routes/sellerRoutes'
import adminRoute from '../routes/adminRoutes'

export const createServer = () => {
    try {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cookieParser())
        app.use(
            cors({
                origin: 'http://localhost:5173',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                credentials: true
            })
        )
        app.use('/api/seller',sellerRoute)
        app.use('/api/buyer',buyerRoute)
        app.use('/api/admin',adminRoute) 
        return app;
    } catch (error) {
        console.log(error);
    }
}