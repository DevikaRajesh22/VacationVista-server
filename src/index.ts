import { createServer } from './infrastructure/config/app';
import dotenv from 'dotenv';
dotenv.config();

const startServer = async()=>{
    try {
        const app = createServer();
        const PORT = process.env.PORT || 3000;
        app?.listen(PORT,()=>{
            console.log(`connected to server at ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}
startServer();