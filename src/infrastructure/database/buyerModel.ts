import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import Buyer from "../../domain/buyer";

const buyerSchema: Schema<Buyer> = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: String
    },
    govtId: {
        type: String,
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
});

const BuyerModel = mongoose.model<Buyer>('buyer', buyerSchema);
export { BuyerModel };