import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

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
        return app;
    } catch (error) {
        console.log(error);
    }
}