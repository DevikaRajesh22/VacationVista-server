import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import Buyer from "../../domain/buyer";

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