import { timeStamp } from "console";
import mongoose, { Document, Schema } from "mongoose";

interface Buyer extends Document {
    name: string,
    email: string,
    password: string,
    isBlocked: boolean,
    dateOfBirth: Date,
    phone: string,
    govtId: string,
    creationTime: Date
}

const buyerSchema: Schema<Buyer> = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: {
        type: String
    },
    govtId: {
        type: String,
        required: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
});

const BuyerModel = mongoose.model<Buyer>('buyer', buyerSchema);
export { BuyerModel };